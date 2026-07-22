export interface ScopeEstimate {
  frontend: number;
  backend: number;
  design: number;
  testing: number;
  management: number;
}

export interface ReportData {
  customerOverview: string;
  businessProblems: string[];
  painPoints: string[];
  solutionProposal: string;
  functionalRequirements: string[];
  userStories: string[];
  technicalArchitecture: string;
  scopeEstimate: ScopeEstimate;
}
