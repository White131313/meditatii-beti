import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Upload, Plus, Trash2, FileText, CheckCircle, AlertCircle, Save, Award, X, Sparkles, Wand2, PenTool, Eye } from 'lucide-react';

const ADMIN_EMAILS = ['bernad.beatrice23@gmail.com', 'bernad.beatrice23@gamil.com', 'cristian.balasa@gmail.com', 'balancionchrys13@gmail.com'];

const Admin = ({ user }) => {
    // Only allow specific emails or a certain role (for simplicity now, just logged in)
    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    // New Lesson Form
    const [newLesson, setNewLesson] = useState({
        title: '',
        category: 'adults_communication',
        description: '',
        file: null,
        isDemo: false
    });

    // Quiz Management State
    const [editingQuizMaterial, setEditingQuizMaterial] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [aiInputText, setAiInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [deletingMaterial, setDeletingMaterial] = useState(null);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        setIsLoading(true);
        const { data } = await supabase.from('materials').select('*').order('created_at', { ascending: false });
        if (data) setMaterials(data);
        setIsLoading(false);
    };

    const handleFileUpload = async (e) => {
        setNewLesson({ ...newLesson, file: e.target.files[0] });
    };

    const saveLesson = async (e) => {
        e.preventDefault();
        if (!newLesson.title || !newLesson.file) {
            setStatus({ type: 'error', msg: 'Titlul și Fișierul sunt obligatorii!' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: 'info', msg: 'Se încarcă...' });

        try {
            // 1. Upload to Supabase Storage
            const fileExt = newLesson.file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `materials/${fileName}`;

            let { error: uploadError, data: uploadData } = await supabase.storage
                .from('materiale-lectii') // Make sure this bucket exists in Supabase
                .upload(filePath, newLesson.file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('materiale-lectii')
                .getPublicUrl(filePath);

            // 3. Save to Database
            const { error: dbError } = await supabase.from('materials').insert([
                {
                    title: newLesson.title,
                    description: newLesson.description,
                    category: newLesson.category,
                    full_file_url: publicUrl,
                    demo_file_url: newLesson.isDemo ? publicUrl : null,
                    thumbnail_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=200'
                }
            ]);

            if (dbError) throw dbError;

            setStatus({ type: 'success', msg: 'Lecția a fost adăugată cu succes!' });
            setNewLesson({ title: '', category: 'adults_communication', description: '', file: null, isDemo: false });
            fetchMaterials();
        } catch (error) {
            setStatus({ type: 'error', msg: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const deleteMaterial = async (material) => {
        setIsLoading(true);
        setStatus({ type: 'info', msg: 'Se șterge materialul...' });

        try {
            // 1. Delete associated Quiz first (Foreign Key constraint)
            await supabase.from('quizzes').delete().eq('material_id', material.id);

            // 2. Delete file from Storage if we can extract the path
            // URL format: .../storage/v1/object/public/materiale-lectii/materials/filename.pdf
            const urlParts = material.full_file_url.split('/materiale-lectii/');
            if (urlParts.length > 1) {
                const storagePath = urlParts[1];
                await supabase.storage.from('materiale-lectii').remove([storagePath]);
            }

            // 3. Delete from Database
            const { error } = await supabase.from('materials').delete().eq('id', material.id);
            if (error) throw error;

            setStatus({ type: 'success', msg: 'Lecția a fost ștearsă!' });
            fetchMaterials();
        } catch (error) {
            console.error('Delete error:', error);
            setStatus({ type: 'error', msg: 'Eroare la ștergere: ' + error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const openQuizEditor = async (material) => {
        setEditingQuizMaterial(material);
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('quizzes')
                .select('*')
                .eq('material_id', material.id)
                .maybeSingle();

            if (data && data.questions) {
                setQuizQuestions(data.questions);
                setAiInputText(data.source_text || '');
            } else {
                setQuizQuestions([]);
            }
        } catch (err) {
            console.error('Error loading quiz:', err);
            setQuizQuestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const addQuestion = () => {
        const newQuestion = {
            type: 'choice',
            question: '',
            options: ['', '', '', ''],
            correct: 0,
            explanation: '',
            correctAnswer: ''
        };
        setQuizQuestions([...quizQuestions, newQuestion]);
    };

    const updateQuestion = (index, field, value) => {
        const updated = [...quizQuestions];
        updated[index][field] = value;
        setQuizQuestions(updated);
    };

    const updateOption = (qIdx, oIdx, value) => {
        const updated = [...quizQuestions];
        updated[qIdx].options[oIdx] = value;
        setQuizQuestions(updated);
    };

    const removeQuestion = (index) => {
        setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
    };

    const saveQuiz = async () => {
        setIsLoading(true);
        setStatus({ type: 'info', msg: 'Se salvează Quiz-ul...' });

        // Safety filter: remove any blank/corrupted questions before saving
        const cleanedQuestions = quizQuestions.filter(q => q.question && q.question.trim() !== '');

        try {
            // Check if quiz exists
            const { data: existingQuiz } = await supabase
                .from('quizzes')
                .select('id')
                .eq('material_id', editingQuizMaterial.id)
                .maybeSingle();

            if (existingQuiz) {
                // Update
                const { error } = await supabase
                    .from('quizzes')
                    .update({
                        questions: cleanedQuestions,
                        source_text: aiInputText
                    })
                    .eq('id', existingQuiz.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase
                    .from('quizzes')
                    .insert([{
                        material_id: editingQuizMaterial.id,
                        questions: cleanedQuestions,
                        source_text: aiInputText
                    }]);
                if (error) throw error;
            }

            setStatus({ type: 'success', msg: 'Quiz salvat cu succes!' });
            setTimeout(() => setEditingQuizMaterial(null), 1500); // Close after showing success
        } catch (error) {
            setStatus({ type: 'error', msg: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const extractTextFromPDF = async (pdfUrl) => {
        setIsGenerating(true);
        setStatus({ type: 'info', msg: 'Se extrage textul din PDF...' });

        try {
            const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n\n';
            }

            setAiInputText(fullText.trim());
            setStatus({ type: 'success', msg: 'Text extras cu succes din PDF!' });
        } catch (error) {
            console.error('PDF Extraction Error:', error);
            setStatus({ type: 'error', msg: 'Nu am putut citi PDF-ul automat. Te rugăm să dai Copy-Paste manual.' });
        } finally {
            setIsGenerating(false);
        }
    };

    const generateWithAI = async () => {
        if (!aiInputText.trim()) {
            setStatus({ type: 'error', msg: 'Te rugăm să introduci textul lecției!' });
            return;
        }

        setIsGenerating(true);
        setStatus({ type: 'info', msg: 'AI-ul analizează textul și creează întrebările...' });

        try {
            const { data, error } = await supabase.functions.invoke('generate-quiz', {
                body: { text: aiInputText, lang: 'RO' }
            });

            if (error) {
                console.error('Invoke error:', error);
                throw new Error(error.message || 'Eroare la apelarea funcției AI');
            }

            if (data && data.error) {
                throw new Error(data.error);
            }

            if (data) {
                const questions = data.questions || [];
                if (questions.length === 0) {
                    setStatus({ type: 'warning', msg: 'AI-ul nu a putut genera întrebări din acest text. Încearcă un text mai lung.' });
                } else {
                    setQuizQuestions(questions);
                    // Don't clear text so it can be saved as source_text
                    setStatus({ type: 'success', msg: `Am generat ${questions.length} întrebări noi!` });
                }
            }
        } catch (error) {
            console.error('AI Error:', error);
            setStatus({ type: 'error', msg: 'Eroare AI: ' + error.message });
        } finally {
            setIsGenerating(false);
        }
    };

    const isAdmin = user && ADMIN_EMAILS.includes(user.email);

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                    <h1 className="text-2xl font-black">Acces Respins</h1>
                    <p className="text-gray-500">Te rugăm să te loghezi pentru a accesa panoul de administrare.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900">Panou de Administrare</h1>
                        <p className="text-gray-500 font-medium">Bună Beatrice! Aici poți gestiona materialele tale.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Add New Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 sticky top-32">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                                <Plus size={20} className="text-brand-600" />
                                Adaugă Lecție Nouă
                            </h2>

                            <form onSubmit={saveLesson} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Titlu Lecție</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Verbul - Prezent"
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-200 rounded-2xl outline-none transition-all font-bold"
                                        value={newLesson.title}
                                        onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Categorie</label>
                                    <select
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-200 rounded-2xl outline-none transition-all font-bold appearance-none cursor-pointer"
                                        value={newLesson.category}
                                        onChange={(e) => setNewLesson({ ...newLesson, category: e.target.value })}
                                    >
                                        <option value="adults_communication">Comunicare Adulți</option>
                                        <option value="gymnasium_curriculum">Materie V-VIII</option>
                                        <option value="national_exam_prep">Evaluare Națională</option>
                                        <option value="practice_exercises">Exersează (Quiz Section)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer group bg-gray-50 p-4 rounded-2xl border-2 border-transparent hover:border-brand-200 transition-all">
                                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${newLesson.isDemo ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-gray-200'}`}>
                                            {newLesson.isDemo && <CheckCircle size={14} />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={newLesson.isDemo}
                                            onChange={(e) => setNewLesson({ ...newLesson, isDemo: e.target.checked })}
                                        />
                                        <div>
                                            <p className="text-sm font-black text-gray-900 leading-none mb-1">Material Demo</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gratis pentru toată lumea</p>
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Fișier PDF</label>
                                    <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl hover:border-brand-300 transition-colors cursor-pointer group bg-gray-50/50">
                                        <Upload size={24} className="text-gray-300 group-hover:text-brand-500 transition-colors mb-2" />
                                        <span className="text-xs font-bold text-gray-400 group-hover:text-brand-600">
                                            {newLesson.file ? newLesson.file.name : 'Selectează PDF'}
                                        </span>
                                        <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                                    </label>
                                </div>

                                {status.msg && (
                                    <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        {status.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                                        {status.msg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black shadow-lg shadow-gray-200 hover:bg-brand-600 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    <Save size={20} />
                                    Salvează Lecția
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Materials List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-black mb-6 px-4">Materiale Active</h2>
                        {isLoading && materials.length === 0 ? (
                            <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div></div>
                        ) : materials.map((material) => (
                            <div key={material.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between group hover:shadow-md transition-all gap-4">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 leading-none mb-1">{material.title}</p>
                                        <p className="text-[10px] font-black uppercase text-brand-500 tracking-widest">{material.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openQuizEditor(material)}
                                        className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-xl font-black text-xs hover:bg-brand-100 transition-all"
                                    >
                                        <Award size={14} />
                                        Manage Quiz
                                    </button>
                                    <a
                                        href={material.full_file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                        title="Vezi PDF"
                                    >
                                        <Eye size={20} />
                                    </a>
                                    <Link
                                        to={`/course/${material.category}`}
                                        className="p-3 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all"
                                        title="Vezi cum apare la elevi"
                                    >
                                        <Wand2 size={20} />
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeletingMaterial(material);
                                        }}
                                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quiz Editor Modal/Overlay */}
                {editingQuizMaterial && (
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">Quiz Editor</h2>
                                    <p className="text-sm font-bold text-gray-500">{editingQuizMaterial.title}</p>
                                </div>
                                <button
                                    onClick={() => setEditingQuizMaterial(null)}
                                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                {/* PDF Auto-Extraction & AI Control */}
                                <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600">
                                                <Sparkles size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-extrabold text-gray-900 leading-none mb-1">AI Magic Generator</h3>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pasul 1: Configurează materia</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => extractTextFromPDF(editingQuizMaterial.full_file_url)}
                                            disabled={isGenerating}
                                            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold text-xs hover:border-brand-300 hover:text-brand-600 transition-all disabled:opacity-50"
                                        >
                                            <FileText size={14} />
                                            Încarcă din PDF
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <textarea
                                            placeholder="Lipește aici textul lecției (ex: explicația despre verbul 'a fi') și AI-ul va crea întrebările pentru tine..."
                                            className="w-full h-32 p-5 bg-white border border-brand-100 rounded-2xl outline-none font-bold text-sm focus:border-brand-400 transition-all resize-none shadow-sm"
                                            value={aiInputText}
                                            onChange={(e) => setAiInputText(e.target.value)}
                                        />
                                        <button
                                            onClick={generateWithAI}
                                            disabled={isGenerating || !aiInputText.trim()}
                                            className="w-full h-16 bg-brand-600 text-white rounded-2xl font-black shadow-lg shadow-brand-100 hover:bg-brand-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale-[0.5] relative overflow-hidden group"
                                        >
                                            {isGenerating ? (
                                                <div className="flex items-center gap-3 animate-pulse">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span className="tracking-wide">Se generează întrebările...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                                                    <span className="text-lg">Generează cu AI</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {quizQuestions.map((q, qIdx) => (
                                        <div key={qIdx} className="bg-gray-50 rounded-[2rem] p-8 border-2 border-transparent hover:border-brand-100 transition-all relative group">
                                            <button
                                                onClick={() => removeQuestion(qIdx)}
                                                className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <div className="space-y-6">
                                                <div className="flex bg-white p-1.5 rounded-2xl w-fit border border-gray-100">
                                                    <button
                                                        onClick={() => updateQuestion(qIdx, 'type', 'choice')}
                                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${q.type === 'choice' || !q.type ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                                    >
                                                        Grilă
                                                    </button>
                                                    <button
                                                        onClick={() => updateQuestion(qIdx, 'type', 'text')}
                                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${q.type === 'text' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                                    >
                                                        Scris
                                                    </button>
                                                </div>

                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Întrebarea {qIdx + 1}</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-5 py-3 bg-white border border-gray-100 rounded-xl outline-none font-bold focus:border-brand-300"
                                                        value={q.question}
                                                        onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)}
                                                    />
                                                </div>

                                                {q.type === 'text' ? (
                                                    <div>
                                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Răspunsul Corect (Model)</label>
                                                        <textarea
                                                            placeholder="Scrie aici răspunsul corect pe care Beatrice îl consideră etalon..."
                                                            className="w-full px-5 py-3 bg-white border border-gray-100 rounded-xl outline-none font-bold text-sm focus:border-brand-300 h-24 resize-none"
                                                            value={q.correctAnswer || ''}
                                                            onChange={(e) => updateQuestion(qIdx, 'correctAnswer', e.target.value)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        {(q.options || ['', '', '', '']).map((opt, oIdx) => (
                                                            <div key={oIdx} className="relative">
                                                                <label className="block text-[8px] font-black uppercase text-gray-400 mb-1">Varianta {oIdx + 1}</label>
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        type="radio"
                                                                        checked={q.correct === oIdx}
                                                                        onChange={() => updateQuestion(qIdx, 'correct', oIdx)}
                                                                        className="w-4 h-4 accent-brand-600"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl outline-none font-bold text-sm focus:border-brand-200"
                                                                        value={opt}
                                                                        onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{q.type === 'text' ? 'Explicație / Feedback' : 'Explicația lui Beatrice'}</label>
                                                    <textarea
                                                        className="w-full px-5 py-3 bg-white border border-gray-100 rounded-xl outline-none font-bold text-sm focus:border-brand-300 h-20 resize-none"
                                                        value={q.explanation}
                                                        onChange={(e) => updateQuestion(qIdx, 'explanation', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4">
                                <button
                                    onClick={() => setEditingQuizMaterial(null)}
                                    className="flex-1 py-4 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-100 transition-all"
                                >
                                    Renunță
                                </button>
                                <button
                                    onClick={() => { if (window.confirm('Ștergi toate întrebările?')) setQuizQuestions([]); }}
                                    className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-all shadow-sm"
                                    title="Șterge Tot"
                                >
                                    <Trash2 size={24} />
                                </button>
                                <button
                                    onClick={addQuestion}
                                    className="flex-1 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-brand-300 hover:text-brand-600 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} />
                                    Manual
                                </button>
                                <button
                                    onClick={saveQuiz}
                                    disabled={isLoading}
                                    className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-gray-200 hover:bg-brand-600 transition-all flex items-center justify-center gap-3"
                                >
                                    {isLoading ? 'Se salvează...' : 'Salvează Tot'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Custom Delete Confirmation Modal */}
                {deletingMaterial && (
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                        <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
                                <Trash2 size={32} />
                            </div>
                            <h3 className="text-xl font-black text-center mb-2">Ești sigură?</h3>
                            <p className="text-gray-500 text-center font-medium mb-8">
                                Vrei să ștergi lecția <span className="text-gray-900 font-bold">"{deletingMaterial.title}"</span>? Această acțiune va șterge și quiz-ul asociat.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setDeletingMaterial(null)}
                                    className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-xl font-black hover:bg-gray-200 transition-all"
                                >
                                    Anulează
                                </button>
                                <button
                                    onClick={() => {
                                        deleteMaterial(deletingMaterial);
                                        setDeletingMaterial(null);
                                    }}
                                    className="flex-1 py-4 bg-red-500 text-white rounded-xl font-black shadow-lg shadow-red-100 hover:bg-red-600 transition-all"
                                >
                                    Da, Șterge
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
