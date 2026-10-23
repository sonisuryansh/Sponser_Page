import { useState } from 'react';
import { X, Check, Copy, School, Send } from 'lucide-react';



interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnershipModal: React.FC<PartnershipModalProps> = ({ isOpen, onClose }) => {
  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [gradeRange, setGradeRange] = useState('Grades 5–10');
  const [selectedTier, setSelectedTier] = useState('Standard (₹600)');
  const [studentCount, setStudentCount] = useState('150–300 students');
  const [hasComputers, setHasComputers] = useState(true);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const summaryText = `MedhaArc Labs — School Partnership Inquiry
Institution: ${schoolName || '[School Name]'}
Contact Person: ${contactName || '[Representative Name]'} (${emailOrPhone || '[Contact Details]'})
Target Grades: ${gradeRange}
Selected Program Tier: ${selectedTier}
Estimated Student Cohort: ${studentCount}
Computer Lab Availability: ${hasComputers ? 'Confirmed (School Provided)' : 'Needs Arrangement'}
Date: ${new Date().toLocaleDateString('en-GB')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#203744]/70 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-2xl bg-[#DFE6E7] border border-[#203744]/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#203744]/10 bg-white/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#398BB0]/10 text-[#398BB0]">
              <School className="w-5 h-5 text-[#398BB0]" />
            </div>
            <div>
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#398BB0] font-semibold">
                School Partnership Exploratory Form
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#203744]">
                Initiate Institutional Dialogue
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full text-[#203744] hover:bg-white border border-transparent hover:border-[#203744]/15 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6">
          {submitted ? (
            <div className="bg-white rounded-xl p-8 text-center space-y-4 border border-[#398BB0]/30 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#398BB0]/10 text-[#398BB0] mx-auto flex items-center justify-center">
                <Check className="w-6 h-6 text-[#398BB0]" />
              </div>
              <h4 className="font-serif-editorial text-2xl font-bold text-[#203744]">
                Inquiry Brief Prepared
              </h4>
              <p className="font-sans-modern text-sm text-[#203744]/75 max-w-md mx-auto leading-relaxed">
                Thank you. Your school profile brief has been generated. You can copy the summary below to share directly with the MedhaArc Labs leadership team.
              </p>
              
              <div className="p-4 rounded-lg bg-[#DFE6E7]/50 border border-[#203744]/10 text-left font-mono-tech text-xs text-[#203744] whitespace-pre-line leading-relaxed">
                {summaryText}
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#398BB0] text-white font-mono-tech text-xs font-semibold hover:bg-[#286D8B] transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary Brief'}</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-[#203744]/15 font-mono-tech text-xs text-[#203744] hover:bg-[#DFE6E7]/50"
                >
                  Edit Parameters
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-tech text-xs uppercase tracking-wider text-[#203744]/70 mb-1">
                    School / Institution Name
                  </label>
                  <input
                    type="text"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g. St. Xavier’s Academy"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#203744]/15 font-sans-modern text-sm text-[#203744] focus:outline-none focus:border-[#398BB0]"
                  />
                </div>
                <div>
                  <label className="block font-mono-tech text-xs uppercase tracking-wider text-[#203744]/70 mb-1">
                    Representative Name & Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma, Principal"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#203744]/15 font-sans-modern text-sm text-[#203744] focus:outline-none focus:border-[#398BB0]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono-tech text-xs uppercase tracking-wider text-[#203744]/70 mb-1">
                  Official Email or Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="contact@school.edu.in / +91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#203744]/15 font-sans-modern text-sm text-[#203744] focus:outline-none focus:border-[#398BB0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#203744]/70 mb-1">
                    Target Grades
                  </label>
                  <select
                    value={gradeRange}
                    onChange={(e) => setGradeRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#203744]/15 font-sans-modern text-xs text-[#203744] focus:outline-none focus:border-[#398BB0]"
                  >
                    <option>Grades 5–8 (Middle School)</option>
                    <option>Grades 5–10 (Secondary)</option>
                    <option>Grades 5–12 (Full Spectrum)</option>
                    <option>Grades 9–12 (Senior STEM)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#203744]/70 mb-1">
                    Proposed Tier
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#203744]/15 font-sans-modern text-xs text-[#203744] focus:outline-none focus:border-[#398BB0]"
                  >
                    <option>Basic (₹500 / student / mo)</option>
                    <option>Standard (₹600 / student / mo)</option>
                    <option>Premium (₹700 / student / mo)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#203744]/70 mb-1">
                    Estimated Cohort
                  </label>
                  <select
                    value={studentCount}
                    onChange={(e) => setStudentCount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#203744]/15 font-sans-modern text-xs text-[#203744] focus:outline-none focus:border-[#398BB0]"
                  >
                    <option>50–150 students</option>
                    <option>150–300 students</option>
                    <option>300–600 students</option>
                    <option>600+ students</option>
                  </select>
                </div>
              </div>

              {/* Computer Lab Confirmation Checkbox */}
              <div className="p-3.5 rounded-lg bg-white border border-[#203744]/10 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="hasComputers"
                  checked={hasComputers}
                  onChange={(e) => setHasComputers(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#398BB0] focus:ring-[#398BB0]"
                />
                <label htmlFor="hasComputers" className="text-xs font-sans-modern text-[#203744]/80">
                  <strong className="text-[#203744] block">School Computer Lab Confirmation</strong>
                  We acknowledge that the school is responsible for arranging computers for student practical sessions.
                </label>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#398BB0] hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy Form Brief'}</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#203744] text-white font-mono-tech text-xs uppercase tracking-wider font-semibold hover:bg-[#286D8B] transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Generate Partnership Brief</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
