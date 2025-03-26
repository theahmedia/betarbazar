import { useState } from 'react';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';

const SectionActivation = () => {
  const [sections, setSections] = useState({
    hero: true,
    videos: true,
    marquee: false,
    review: true,
    faq: true,
    jobs: false
  });

  const toggleSection = (section) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-custom-black mb-6">Section Activation</h2>
      <div className="space-y-4">
        {Object.entries(sections).map(([section, isActive]) => (
          <div key={section} className="flex items-center justify-between p-4 bg-slate-200 rounded-lg">
            <span className="text-custom-black capitalize">{section} Section</span>
            <button
              onClick={() => toggleSection(section)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isActive ? (
                <FiToggleRight className="w-8 h-8 text-green-600" />
              ) : (
                <FiToggleLeft className="w-8 h-8 text-red-400" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionActivation; 