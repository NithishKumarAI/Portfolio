import { FileDown } from 'lucide-react';
import { RESUME_FILENAME, RESUME_PATH } from '../constants/resume';

type ResumeLinkVariant = 'primary' | 'outline';

interface ResumeLinkProps {
  variant?: ResumeLinkVariant;
  className?: string;
}

const monoStyle = {
  fontFamily: 'JetBrains Mono, monospace',
  letterSpacing: '0.05em',
} as const;

export default function ResumeLink({ variant = 'outline', className = '' }: ResumeLinkProps) {
  const isPrimary = variant === 'primary';

  return (
    <a
      href={RESUME_PATH}
      download={RESUME_FILENAME}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-bold transition-all ${
        isPrimary
          ? 'px-6 py-2.5 rounded text-sm hover:bg-cyan-400'
          : 'px-4 py-2 text-xs rounded hover:bg-cyan-500 hover:text-black cursor-pointer'
      } ${className}`}
      style={
        isPrimary
          ? { ...monoStyle, background: '#06b6d4', color: '#000' }
          : {
              ...monoStyle,
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.5)',
              color: '#22d3ee',
            }
      }
    >
      <FileDown className="w-4 h-4 shrink-0" aria-hidden />
      Resume
    </a>
  );
}
