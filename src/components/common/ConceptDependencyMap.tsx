import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle, Sparkles, BookOpen, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DependencyNode {
  id: string;
  title: string;
  grade: string;
  masteryScore: number;
  status: 'MASTERED' | 'WEAK_PREREQUISITE' | 'IN_PROGRESS' | 'TARGET_CONCEPT';
  description: string;
  observedEvidence?: string;
  inferredHypothesis?: string;
}

const DEPENDENCY_NODES: DependencyNode[] = [
  {
    id: 'node_1',
    title: 'Basic Arithmetic Operations',
    grade: 'Grade 6 Foundational',
    masteryScore: 96,
    status: 'MASTERED',
    description: 'Addition, subtraction, multiplication, and long division with whole numbers.',
    observedEvidence: '100% accuracy on diagnostic arithmetic screening.',
  },
  {
    id: 'node_2',
    title: 'Negative Numbers & Integer Rules',
    grade: 'Grade 7 Prerequisite',
    masteryScore: 40,
    status: 'WEAK_PREREQUISITE',
    description: 'Signed numbers arithmetic: (-a) * (-b) = +ab and (-a) / (-b) = +c, plus number line directionality.',
    observedEvidence: 'Observed: Missed 3 consecutive diagnostic problems involving negative variable multipliers (-3x = -21).',
    inferredHypothesis: 'Inferred Prerequisite Weakness: The student confuses the sign-flipping rule during division versus addition.',
  },
  {
    id: 'node_3',
    title: 'Algebraic Expressions & Distribution',
    grade: 'Grade 8 Foundational',
    masteryScore: 72,
    status: 'IN_PROGRESS',
    description: 'Combining like terms and applying the distributive property a(b + c) = ab + ac.',
    observedEvidence: 'Observed: Correctly expanded 4(2x - 3), but struggled when negative outer multipliers were introduced.',
    inferredHypothesis: 'Inferred: Strong symbolic understanding, but blocked whenever Node 2 negative rules are required.',
  },
  {
    id: 'node_4',
    title: 'Linear Equations in One Variable',
    grade: 'Grade 10 Target Concept',
    masteryScore: 35,
    status: 'TARGET_CONCEPT',
    description: 'Isolating variables using balanced multi-step transformations across the equality sign.',
    observedEvidence: 'Observed: Student scored 35% on Chapter Assessment.',
    inferredHypothesis: 'Direct Result: Difficulty is secondary; resolving Node 2 will restore expected 85%+ target mastery.',
  }
];

export const ConceptDependencyMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<DependencyNode>(DEPENDENCY_NODES[1]);
  const navigate = useNavigate();

  return (
    <div className="p-6 rounded-2xl bg-[#171F3A] border border-[#7657F6]/30 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30">
              TEQORA Objective 2
            </span>
            <span className="text-xs text-slate-400">Cognitive Dependency Map</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">Interactive Prerequisite Knowledge Graph</h2>
          <p className="text-xs text-slate-300">
            Click any node below to inspect verified evidence versus inferred prerequisite causes.
          </p>
        </div>

        <span className="text-[11px] text-slate-400 italic">
          Linear Equations Knowledge Chain
        </span>
      </div>

      {/* Visual Horizontal Node Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {DEPENDENCY_NODES.map((node, index) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <div key={node.id} className="relative">
              <button
                onClick={() => setSelectedNode(node)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#FFC857] shadow-glow-accent'
                    : 'hover:border-white/20'
                } ${
                  node.status === 'MASTERED'
                    ? 'bg-[#10B981]/10 border-[#10B981]/40'
                    : node.status === 'WEAK_PREREQUISITE'
                    ? 'bg-[#EF4444]/15 border-[#EF4444] animate-pulse-subtle'
                    : node.status === 'IN_PROGRESS'
                    ? 'bg-[#3B82F6]/10 border-[#3B82F6]/40'
                    : 'bg-[#7657F6]/15 border-[#7657F6]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">Step {index + 1}</span>
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      node.status === 'MASTERED'
                        ? 'bg-[#10B981]/20 text-[#10B981]'
                        : node.status === 'WEAK_PREREQUISITE'
                        ? 'bg-[#EF4444]/20 text-[#EF4444]'
                        : node.status === 'IN_PROGRESS'
                        ? 'bg-[#3B82F6]/20 text-[#60A5FA]'
                        : 'bg-[#7657F6]/20 text-[#A78BFA]'
                    }`}
                  >
                    {node.status === 'WEAK_PREREQUISITE' ? '⚠️ BLOCKED' : node.status.replace('_', ' ')}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white mt-2 leading-tight">{node.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{node.grade}</p>

                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Mastery:</span>
                  <span
                    className={`font-bold ${
                      node.masteryScore >= 80
                        ? 'text-[#10B981]'
                        : node.masteryScore >= 60
                        ? 'text-[#F59E0B]'
                        : 'text-[#EF4444]'
                    }`}
                  >
                    {node.masteryScore}%
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive Panel (Strict TEQORA requirement: Distinguish observed mistakes from inferred causes) */}
      <div className="p-5 rounded-xl bg-[#111831] border border-white/5 space-y-4 animate-in fade-in-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7657F6]/20 border border-[#7657F6]/40 flex items-center justify-center text-[#A78BFA]">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{selectedNode.title}</h3>
              <p className="text-[11px] text-slate-400">{selectedNode.description}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/student/tutor')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7657F6] hover:bg-[#6442E8] text-xs font-bold text-white shadow-glow-primary transition-all self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Remediate in Nexa AI</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Observed Evidence */}
          <div className="p-3.5 rounded-xl bg-[#171F3A] border border-white/5 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-[#A78BFA] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              Observed Factual Evidence (Screening Data):
            </span>
            <p className="text-slate-200 leading-relaxed font-mono text-[11px]">
              {selectedNode.observedEvidence}
            </p>
          </div>

          {/* Inferred Underlying Cause */}
          <div className="p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-[#FFC857] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#FFC857]" />
              Inferred Pedagogical Root Cause (Not Proven Certainty):
            </span>
            <p className="text-slate-200 leading-relaxed text-[11px]">
              {selectedNode.inferredHypothesis || 'Foundational prerequisite is sound; student can proceed without conceptual blockers.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
