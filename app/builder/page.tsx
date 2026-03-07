"use client";

import {
  Search,
  Type,
  AlignLeft,
  Mail,
  Phone,
  Calendar,
  Plus,
  Image as ImageIcon,
  ChevronDown,
  Box,
} from "lucide-react";

export default function Builder() {
  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] text-[#121626] font-sans">
      {/* Left Sidebar */}
      <aside className="w-[280px] border-r border-[#E5E7EB] bg-white flex flex-col pt-6 pb-4 px-6 fixed top-0 left-0 bottom-0 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-[#3B6FF1] p-1.5 rounded-md flex items-center justify-center">
            <Box className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold">Testimo</span>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 bg-[#F3F4F6] rounded-lg text-sm outline-none placeholder:text-[#9CA3AF]"
          />
        </div>

        {/* Components Header */}
        <h3 className="text-[11px] font-bold text-[#9CA3AF] tracking-wider mb-4">
          COMPONENTS
        </h3>

        {/* Components List */}
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg bg-[#EFF6FF] text-[#2563EB] font-medium text-sm transition-colors text-left">
            <Type className="w-4 h-4" />
            Short text
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-[#F3F4F6] text-[#4B5563] font-medium text-sm transition-colors text-left">
            <AlignLeft className="w-4 h-4" />
            Long text
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-[#F3F4F6] text-[#4B5563] font-medium text-sm transition-colors text-left">
            <Mail className="w-4 h-4" />
            Email
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-[#F3F4F6] text-[#4B5563] font-medium text-sm transition-colors text-left">
            <Phone className="w-4 h-4" />
            Phone number
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-[#F3F4F6] text-[#4B5563] font-medium text-sm transition-colors text-left">
            <Calendar className="w-4 h-4" />
            Date and time
          </button>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col ml-[280px] mr-[320px] bg-[#FAFAFA]">
        {/* Top Navbar */}
        <header className="h-[60px] border-b border-[#E5E7EB] bg-white flex items-center justify-between px-6 sticky top-0 z-10 w-full">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#111827]">
              <Plus className="w-4 h-4" />
              Add page
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#111827]">
              <ImageIcon className="w-4 h-4" />
              Cover
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-[#4B5563] hover:text-[#111827]">
              Preview
            </button>
            <button className="bg-[#2D6CFF] hover:bg-[#2057d5] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
              Publish
            </button>
          </div>
        </header>

        {/* Canvas Background (Dotted) */}
        <div className="flex-1 overflow-auto p-12 flex justify-center pb-24" 
             style={{ backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
          
          {/* Form Form Card */}
          <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] w-full max-w-[640px] p-10 flex flex-col mt-4">
            
            <h1 className="text-[28px] font-bold text-[#111827] mb-2">
              General Information
            </h1>
            <p className="text-[#6B7280] text-[15px] mb-10">
              Kindly enter your information below.
            </p>

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              {/* Row 1 */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#374151] mb-2">First name*</label>
                  <input
                    type="text"
                    placeholder="Ex. Lumix"
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/20 focus:border-[#2D6CFF]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#374151] mb-2">Last name*</label>
                  <input
                    type="text"
                    placeholder="Ex. Lumix"
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/20 focus:border-[#2D6CFF]"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Your email*</label>
                <input
                  type="email"
                  placeholder="Ex. lumix@company.com"
                  className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/20 focus:border-[#2D6CFF]"
                />
              </div>

              {/* Row 3 (Selected Field) */}
              <div className="relative rounded-xl border-2 border-[#2D6CFF] p-4 bg-white shadow-[0_0_0_4px_rgba(45,108,255,0.1)]">
                <label className="block text-xs font-medium text-[#6B7280] mb-2">Reason for testimonial</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white font-medium text-[#111827] text-sm focus:outline-none cursor-pointer pr-10">
                    <option>Great customer service</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                </div>
              </div>

            </form>
          </div>

        </div>
      </main>

      {/* Right Sidebar (Properties) */}
      <aside className="w-[320px] border-l border-[#E5E7EB] bg-white p-6 fixed top-0 right-0 bottom-0 overflow-y-auto">
        <h2 className="text-[17px] font-bold text-[#111827] mb-8 mt-2">
          Field Properties
        </h2>

        {/* Field Type */}
        <div className="mb-8">
          <label className="block text-[11px] font-bold text-[#9CA3AF] tracking-wider mb-3">
            FIELD TYPE
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/20 focus:border-[#2D6CFF] cursor-pointer shadow-sm pr-10">
              <option>Dropdown Selection</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
          </div>
        </div>

        {/* Label Content */}
        <div className="mb-8">
          <label className="block text-[11px] font-bold text-[#9CA3AF] tracking-wider mb-3">
            LABEL
          </label>
          <input
            type="text"
            defaultValue="Reason for testimonial"
            className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#2D6CFF]/20 focus:border-[#2D6CFF] shadow-sm"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-6 border-t border-[#E5E7EB] pt-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#374151]">Required</label>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#2D6CFF] transition-colors focus:outline-none p-1">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#9CA3AF]">Hidden</label>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#E5E7EB] transition-colors focus:outline-none p-1">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-0" />
            </button>
          </div>
        </div>
      </aside>

    </div>
  );
}
