'use client';

import React, { useState } from 'react';
import { ReportData } from '@/types';
import { EffortChart } from './EffortChart';

interface ReportViewProps {
  data: ReportData;
  onUpdate: (updatedData: ReportData) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ data, onUpdate }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const startEdit = (field: string, initialValue: any) => {
    setEditingField(field);
    setEditValues({
      ...editValues,
      [field]: Array.isArray(initialValue) ? [...initialValue] : initialValue,
    });
  };

  const handleFieldChange = (field: string, value: any) => {
    setEditValues({
      ...editValues,
      [field]: value,
    });
  };

  const handleArrayElementChange = (field: string, index: number, value: string) => {
    const arr = [...(editValues[field] || [])];
    arr[index] = value;
    setEditValues({
      ...editValues,
      [field]: arr,
    });
  };

  const addArrayElement = (field: string) => {
    const arr = [...(editValues[field] || data[field as keyof ReportData] as string[])];
    arr.push('');
    setEditValues({
      ...editValues,
      [field]: arr,
    });
  };

  const removeArrayElement = (field: string, index: number) => {
    const arr = [...(editValues[field] || data[field as keyof ReportData] as string[])];
    arr.splice(index, 1);
    setEditValues({
      ...editValues,
      [field]: arr,
    });
  };

  const saveEdit = (field: string) => {
    const updated = {
      ...data,
      [field]: editValues[field],
    };
    onUpdate(updated);
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
  };

  const handleSendToConsultant = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 5000);
    }, 1500);
  };

  const renderSectionCard = (
    title: string,
    field: keyof ReportData,
    icon: React.ReactNode,
    content: React.ReactNode,
    editContent: React.ReactNode
  ) => {
    const isEditing = editingField === field;

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#9B2740] hover:shadow-md transition-all duration-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 text-[#40252F] font-bold text-lg">
            {icon}
            <span>{title}</span>
          </div>
          {!isEditing ? (
            <button
              onClick={() => startEdit(field, data[field])}
              className="text-gray-400 hover:text-[#9B2740] p-1.5 rounded-lg hover:bg-gray-50 transition-all duration-200"
              title={`Edit ${title}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => saveEdit(field)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-sm transition-all"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-xs font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {isEditing ? editContent : content}
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Sent Success Toast */}
      {sentSuccess && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#40252F] text-white border border-[#A68C41] px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <svg className="w-6 h-6 text-[#A68C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-bold text-sm">Success!</p>
            <p className="text-xs text-gray-300">Report delivered to consultant@firm.com (Demo)</p>
          </div>
        </div>
      )}

      {/* Customer Overview */}
      {renderSectionCard(
        'Customer Overview',
        'customerOverview',
        <svg className="w-5 h-5 text-[#A68C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
        <p className="text-[#1E293B] text-sm leading-relaxed">{data.customerOverview}</p>,
        <textarea
          value={editValues.customerOverview || ''}
          onChange={(e) => handleFieldChange('customerOverview', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#9B2740] focus:border-transparent outline-none h-24"
        />
      )}

      {/* Business Problems */}
      {renderSectionCard(
        'Business Problems',
        'businessProblems',
        <svg className="w-5 h-5 text-[#A68C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
        <ul className="list-disc pl-5 space-y-2 text-[#1E293B] text-sm">
          {data.businessProblems.map((prob, idx) => (
            <li key={idx} className="leading-relaxed">{prob}</li>
          ))}
        </ul>,
        <div className="space-y-2">
          {(editValues.businessProblems || []).map((prob: string, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <input
                type="text"
                value={prob}
                onChange={(e) => handleArrayElementChange('businessProblems', idx, e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#9B2740] focus:border-transparent outline-none"
              />
              <button
                onClick={() => removeArrayElement('businessProblems', idx)}
                className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayElement('businessProblems')}
            className="text-[#9B2740] hover:text-[#40252F] text-xs font-bold flex items-center space-x-1 mt-1"
          >
            <span>+ Add Problem</span>
          </button>
        </div>
      )}

      {/* Pain Points */}
      {renderSectionCard(
        'Identified Pain Points',
        'painPoints',
        <svg className="w-5 h-5 text-[#A68C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        <ul className="list-disc pl-5 space-y-2 text-[#1E293B] text-sm">
          {data.painPoints.map((point, idx) => (
            <li key={idx} className="leading-relaxed">{point}</li>
          ))}
        </ul>,
        <div className="space-y-2">
          {(editValues.painPoints || []).map((point: string, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handleArrayElementChange('painPoints', idx, e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#9B2740] focus:border-transparent outline-none"
              />
              <button
                onClick={() => removeArrayElement('painPoints', idx)}
                className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayElement('painPoints')}
            className="text-[#9B2740] hover:text-[#40252F] text-xs font-bold flex items-center space-x-1 mt-1"
          >
            <span>+ Add Pain Point</span>
          </button>
        </div>
      )}

      {/* Solution Proposal */}
      {renderSectionCard(
        'Proposed Solution',
        'solutionProposal',
        <svg className="w-5 h-5 text-[#A68C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
        <p className="text-[#1E293B] text-sm leading-relaxed">{data.solutionProposal}</p>,
        <textarea
          value={editValues.solutionProposal || ''}
          onChange={(e) => handleFieldChange('solutionProposal', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#9B2740] focus:border-transparent outline-none h-24"
        />
      )}

      {/* Functional Requirements */}
      {renderSectionCard(
        'Functional Requirements',
        'functionalRequirements',
        <svg className="w-5 h-5 text-[#A68C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
        <ul className="list-disc pl-5 space-y-2 text-[#1E293B] text-sm">
          {data.functionalRequirements.map((req, idx) => (
            <li key={idx} className="leading-relaxed">{req}</li>
          ))}
        </ul>,
        <div className="space-y-2">
          {(editValues.functionalRequirements || []).map((req: string, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleArrayElementChange('functionalRequirements', idx, e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#9B2740] focus:border-transparent outline-none"
              />
              <button
                onClick={() => removeArrayElement('functionalRequirements', idx)}
                className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayElement('functionalRequirements')}
            className="text-[#9B2740] hover:text-[#40252F] text-xs font-bold flex items-center space-x-1 mt-1"
          >
            <span>+ Add Requirement</span>
          </button>
        </div>
      )}

      {/* User Stories */}
      {renderSectionCard(
        'User Stories',
        'userStories',
        <svg className="w-5 h-5 text-[#A68C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        <ul className="list-disc pl-5 space-y-2 text-[#1E293B] text-sm">
          {data.userStories.map((story, idx) => (
            <li key={idx} className="leading-relaxed">{story}</li>
          ))}
        </ul>,
        <div className="space-y-2">
          {(editValues.userStories || []).map((story: string, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <input
                type="text"
                value={story}
                onChange={(e) => handleArrayElementChange('userStories', idx, e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-[#9B2740] focus:border-transparent outline-none"
              />
              <button
                onClick={() => removeArrayElement('userStories', idx)}
                className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayElement('userStories')}
            className="text-[#9B2740] hover:text-[#40252F] text-xs font-bold flex items-center space-x-1 mt-1"
          >
            <span>+ Add Story</span>
          </button>
        </div>
      )}

      {/* Technical Architecture */}
      {renderSectionCard(
        'Technical Architecture',
        'technicalArchitecture',
        <svg className="w-5 h-5 text-[#A68C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
        <p className="text-[#1E293B] text-sm leading-relaxed">{data.technicalArchitecture}</p>,
        <textarea
          value={editValues.technicalArchitecture || ''}
          onChange={(e) => handleFieldChange('technicalArchitecture', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#9B2740] focus:border-transparent outline-none h-24"
        />
      )}

      {/* Effort Distribution Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#A68C41] hover:shadow-md transition-all duration-200 mb-6">
        <div className="flex items-center space-x-2 text-[#40252F] font-bold text-lg mb-4">
          <svg className="w-5 h-5 text-[#A68C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          <span>Effort Estimation & Scope</span>
        </div>
        <div className="flex justify-center max-w-[280px] mx-auto py-2">
          <EffortChart scopeEstimate={data.scopeEstimate} />
        </div>
      </div>

      {/* Final Action Button */}
      <button
        onClick={handleSendToConsultant}
        disabled={isSending}
        className="w-full bg-[#40252F] hover:bg-[#9B2740] text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3 text-base tracking-wider disabled:opacity-50"
      >
        {isSending ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Delivering Report...</span>
          </>
        ) : (
          <>
            <span className="text-xl">📨</span>
            <span>Send to Consultant</span>
          </>
        )}
      </button>
    </div>
  );
};
