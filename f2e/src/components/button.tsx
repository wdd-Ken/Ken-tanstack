import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

// 定義元件的 Props 型態
interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  onPrev: () => void
  onNext: () => void
  prevText?: string
  nextText?: string
  submitText?: string
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  prevText = 'Prev',
  nextText = 'Next',
  submitText = 'Submit',
}) => {
  // 提取公共樣式
  const btnBaseClass = 'p-2.5 text-white flex items-center justify-center rounded-md cursor-pointer min-w-50 transition-colors';

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center gap-4">
      {/* 上一步按鈕：第一步時隱藏 */}
      <motion.button
        type="button"
        onClick={onPrev}
        className={cn(btnBaseClass, 'bg-grey hover:bg-pink', isFirstStep && 'hidden')}
        >
        {prevText}
      </motion.button>

      {/* 下一步按鈕：最後一步時隱藏 */}
      <motion.button
        type="button"
        onClick={onNext}
        className={cn(btnBaseClass, 'bg-blue hover:bg-pink', isLastStep && 'hidden')}
        >
        {nextText}
      </motion.button>

      {/* 送出按鈕：只有在最後一步時顯示 */}
      <motion.button
        type="submit"
        className={cn(btnBaseClass, 'bg-pink hover:bg-blue', !isLastStep && 'hidden')}
      >
        {submitText}
      </motion.button>
    </div>
  );
};

export default StepNavigation
