import { stagger } from "motion"

export const transition = {
  duration: 0.8,
  ease: [0.66, 0, 0.34, 1] as const,
}

export const stepTrans = {
  duration: 0.5,
  ease: [0.66, 0, 0.34, 1] as const,
}

export const statusSwitch = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.2),
    }
  }
}