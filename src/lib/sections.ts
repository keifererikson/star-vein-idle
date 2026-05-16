import type { Component } from 'vue'
import {
  Factory,
  LayoutDashboard,
  Pickaxe,
  Settings2,
} from 'lucide-vue-next'

import ExtractionView from '@/views/ExtractionView.vue'
import IndustryView from '@/views/IndustryView.vue'
import ManagementView from '@/views/ManagementView.vue'
import OperationsView from '@/views/OperationsView.vue'

export type SectionId = 'operations' | 'extraction' | 'industry' | 'management'

export interface SectionDefinition {
  id: SectionId
  label: string
  icon: Component
  view: Component
}

export const SECTIONS: SectionDefinition[] = [
  {
    id: 'operations',
    label: 'Operations',
    icon: LayoutDashboard,
    view: OperationsView,
  },
  {
    id: 'extraction',
    label: 'Extraction',
    icon: Pickaxe,
    view: ExtractionView,
  },
  {
    id: 'industry',
    label: 'Industry',
    icon: Factory,
    view: IndustryView,
  },
  {
    id: 'management',
    label: 'Management',
    icon: Settings2,
    view: ManagementView,
  },
]

export const DEFAULT_SECTION_ID: SectionId = 'operations'
