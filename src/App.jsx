import React, { useMemo, useState } from 'react'

const folders = [
  {
    id: 'intent-order',
    name: 'Intent / Order',
    meta: '265 files * 56GB',
    docs: [
      {
        id: 'intent-team',
        name: 'Team pancard.pdf',
        size: '4.8MB',
        date: '7 May 2025',
        type: 'PDF',
        uploadedBy: 'mridul dave',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
      {
        id: 'intent-draft',
        name: 'Draftsofbank.pdf',
        size: '4.89MB',
        date: '7 May 2025',
        type: 'PDF',
        uploadedBy: 'mridul dave',
        url: 'https://www.orimi.com/pdf-test.pdf',
      },
      {
        id: 'intent-invoice',
        name: 'Invoicesalary.pdf',
        size: '5.08MB',
        date: '5 May 2025',
        type: 'PDF',
        uploadedBy: 'mridul dave',
        url: 'https://www.africau.edu/images/default/sample.pdf',
      },
    ],
  },
  {
    id: 'email',
    name: 'Email',
    meta: '265 files * 56GB',
    docs: [
      {
        id: 'email-policy',
        name: 'Companypolicy.pdf',
        size: '2.7MB',
        date: '3 May 2025',
        type: 'PDF',
        uploadedBy: 'sana khan',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
      {
        id: 'email-nda',
        name: 'EmployeeNDA.pdf',
        size: '3.2MB',
        date: '4 May 2025',
        type: 'PDF',
        uploadedBy: 'sana khan',
        url: 'https://www.orimi.com/pdf-test.pdf',
      },
    ],
  },
  {
    id: 'drafts',
    name: 'Drafts',
    meta: '265 files * 56GB',
    docs: [
      {
        id: 'draft-privacy',
        name: 'Privacydraft.pdf',
        size: '6.3MB',
        date: '2 May 2025',
        type: 'PDF',
        uploadedBy: 'nishant rao',
        url: 'https://www.africau.edu/images/default/sample.pdf',
      },
      {
        id: 'draft-legal',
        name: 'Legalnotes.pdf',
        size: '1.9MB',
        date: '1 May 2025',
        type: 'PDF',
        uploadedBy: 'nishant rao',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
    ],
  },
  {
    id: 'invoices',
    name: 'Invoices',
    meta: '265 files * 56GB',
    docs: [
      {
        id: 'invoice-jan',
        name: 'InvoiceJan.pdf',
        size: '4.2MB',
        date: '28 Apr 2025',
        type: 'PDF',
        uploadedBy: 'aarav mehta',
        url: 'https://www.orimi.com/pdf-test.pdf',
      },
      {
        id: 'invoice-feb',
        name: 'InvoiceFeb.pdf',
        size: '4.7MB',
        date: '29 Apr 2025',
        type: 'PDF',
        uploadedBy: 'aarav mehta',
        url: 'https://www.africau.edu/images/default/sample.pdf',
      },
    ],
  },
]

const overviewSections = [
  {
    id: 'ipr',
    title: 'IPR Sector',
    items: [
      { docId: 'intent-team', name: 'Team pancard.pdf' },
      { docId: 'intent-draft', name: 'Draftsofbank.pdf' },
      { docId: 'invoice-jan', name: 'InvoiceJan.pdf' },
      { docId: 'invoice-feb', name: 'InvoiceFeb.pdf' },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Sector',
    items: [
      { docId: 'email-policy', name: 'Companypolicy.pdf' },
      { docId: 'email-nda', name: 'EmployeeNDA.pdf' },
      { docId: 'draft-privacy', name: 'Privacydraft.pdf' },
      { docId: 'draft-legal', name: 'Legalnotes.pdf' },
    ],
  },
  {
    id: 'contracts',
    title: 'Contracts Sector',
    items: [],
  },
]

const App = () => {
  const [mode, setMode] = useState('overview')
  const [lastMode, setLastMode] = useState('overview')
  const [query, setQuery] = useState('')
  const [activeFolderId, setActiveFolderId] = useState(folders[0].id)
  const [activeDocId, setActiveDocId] = useState(folders[0].docs[0].id)

  const allDocs = useMemo(
    () =>
      folders.flatMap((folder) =>
        folder.docs.map((doc) => ({
          ...doc,
          folderId: folder.id,
          folderName: folder.name,
        })),
      ),
    [],
  )

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return []
    return allDocs.filter(
      (doc) =>
        doc.name.toLowerCase().includes(trimmed) ||
        doc.folderName.toLowerCase().includes(trimmed),
    )
  }, [allDocs, query])

  const activeFolder = folders.find((folder) => folder.id === activeFolderId) || folders[0]
  const activeDoc =
    allDocs.find((doc) => doc.id === activeDocId) || allDocs[0]

  const sidebarDocs =
    mode === 'search'
      ? searchResults
      : mode === 'folder'
        ? activeFolder.docs.map((doc) => ({
            ...doc,
            folderName: activeFolder.name,
            folderId: activeFolder.id,
          }))
        : []

  const handleFolderOpen = (folderId) => {
    const folder = folders.find((item) => item.id === folderId) || folders[0]
    setActiveFolderId(folder.id)
    setActiveDocId(folder.docs[0]?.id || allDocs[0]?.id)
    setQuery('')
    setLastMode('overview')
    setMode('folder')
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    if (value.trim()) {
      if (mode !== 'search') {
        setLastMode(mode)
        setMode('search')
      }
    } else {
      setMode(lastMode)
    }
    setQuery(value)
    if (value.trim()) {
      const result = allDocs.find((doc) =>
        doc.name.toLowerCase().includes(value.trim().toLowerCase()),
      )
      if (result) {
        setActiveDocId(result.id)
      }
    }
  }

  const handleBack = () => {
    setQuery('')
    setMode('overview')
  }

  return (
    <div className="min-h-screen text-[#26221e]">
      <div className="mx-auto max-w-[1240px] px-4 pb-7 pt-5 animate-[app-rise_0.55s_ease-out] lg:px-[26px] lg:pb-[44px] lg:pt-[34px]">
        <header className="grid grid-cols-1 items-center gap-4 rounded-[22px] border border-[#ebdfd3]/90 bg-gradient-to-b from-white/80 to-white/70 p-3 shadow-[0_14px_32px_rgba(71,43,20,0.11)] backdrop-blur lg:grid-cols-[250px_minmax(340px,1fr)_auto] lg:gap-6 lg:p-3.5">
          <div>
            <div className="font-['Fraunces'] text-[30px] font-semibold tracking-[0.3px] text-[#2f271f]">
              Vault
            </div>
            <div className="mt-[3px] text-[13px] text-[#7f746b]">
              Upload, store and read as you like
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <button
              className="group p-0"
              onClick={handleBack}
              aria-label="Back"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#ebdfd3] bg-gradient-to-b from-[#fffefc] to-[#fff8f1] text-[#7f746b] shadow-[0_14px_32px_rgba(71,43,20,0.11)] transition group-hover:-translate-y-0.5 group-hover:border-[#e4bea0] group-hover:text-[#b97336]">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M15 6l-6 6 6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#7f746b]">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm7-1l-3.5-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="XYZ Startup legal"
                value={query}
                onChange={handleSearchChange}
                className="w-full rounded-full border border-[#ebdfd3] bg-[#fffdfb] py-3 pl-11 pr-11 text-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_32px_rgba(71,43,20,0.11)] outline-none transition duration-200 focus:-translate-y-0.5 focus:border-[#e6bb96] focus:shadow-[0_0_0_4px_rgba(207,146,88,0.16),0_14px_32px_rgba(71,43,20,0.11)]"
              />
              {query && (
                <button
                  className="absolute right-3.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-transparent text-[14px] text-[#7f746b] transition hover:border-[#edd4bc] hover:bg-[#fff4e9] hover:text-[#3b3128]"
                  onClick={() => {
                    setQuery('')
                    setMode(lastMode)
                  }}
                >
                  x
                </button>
              )}
            </div>

            {query && (
              <div className="absolute top-14 left-0 right-0 z-20 rounded-[16px] border border-[#ebdfd3] bg-gradient-to-b from-[#fffdfa] to-[#fff6ee] p-3 shadow-[0_26px_60px_rgba(71,43,20,0.12),0_8px_20px_rgba(71,43,20,0.08)] lg:left-11">
                {searchResults.slice(0, 4).map((doc) => (
                  <button
                    key={doc.id}
                    className="flex w-full items-center gap-2.5 rounded-[10px] px-2 py-2 text-left text-[14px] transition hover:translate-x-0.5 hover:bg-[#ffeedd]"
                    onClick={() => setActiveDocId(doc.id)}
                  >
                    <span
                      className="inline-flex h-4 w-4 items-center justify-center text-[#7f746b]"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm7-1l-3.5-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span className="truncate">{doc.name}</span>
                  </button>
                ))}
                {!searchResults.length && (
                  <div className="p-2 text-[13px] text-[#7f746b]">
                    No matches found
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-[#e6c2a4] bg-gradient-to-b from-[#fffaf5] to-[#fff7ef] px-4 py-2.5 text-[14px] shadow-[0_14px_32px_rgba(71,43,20,0.11)] transition hover:-translate-y-0.5 hover:border-[#d8a87f] hover:shadow-[0_16px_28px_rgba(107,66,30,0.17)]">
              <span className="h-4 w-4 text-[#b97336]">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 7h10M4 12h16M4 17h8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-[#e6c2a4] bg-gradient-to-b from-[#fffaf5] to-[#fff7ef] px-4 py-2.5 text-[14px] shadow-[0_14px_32px_rgba(71,43,20,0.11)] transition hover:-translate-y-0.5 hover:border-[#d8a87f] hover:shadow-[0_16px_28px_rgba(107,66,30,0.17)]">
              <span className="h-4 w-4 text-[#b97336]">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8 6v12M8 18l-3-3M8 18l3-3M16 6l3 3M16 6l-3 3M16 6v12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Sort
            </button>
          </div>
        </header>

        <div className="mt-6 grid gap-5 lg:grid-cols-[250px_1fr]">
          <aside className="flex min-h-0 flex-col gap-3 rounded-[22px] border border-[#ebdfd3] bg-gradient-to-b from-[#fffefc] to-[#fff7ee] p-4 shadow-[0_26px_60px_rgba(71,43,20,0.12),0_8px_20px_rgba(71,43,20,0.08)] lg:min-h-[520px]">
            {mode === 'overview' && (
              <>
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    className={`flex items-center gap-3 rounded-[14px] border px-3 py-[11px] text-left transition ${
                      activeFolderId === folder.id
                        ? 'border-[#daa97f] bg-gradient-to-b from-[#fff3e6] to-[#ffe9d6] text-[#b97336] shadow-[0_14px_24px_rgba(181,114,57,0.22)]'
                        : 'border-[#ebddcf] bg-gradient-to-b from-[#fffdf9] to-[#fff8f1] hover:-translate-y-0.5 hover:border-[#e2c3a9] hover:shadow-[0_10px_20px_rgba(97,62,30,0.12)]'
                    }`}
                    onClick={() => handleFolderOpen(folder.id)}
                  >
                    <span className="h-[26px] w-[26px] text-[#b97336]">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>
                      <div className="text-[14px] font-semibold">{folder.name}</div>
                      <div className="mt-0.5 block text-[12px] text-[#7f746b]">
                        {folder.meta}
                      </div>
                    </span>
                  </button>
                ))}
              </>
            )}

            {(mode === 'folder' || mode === 'search') && (
              <>
                {sidebarDocs.map((doc) => (
                  <button
                    key={doc.id}
                    className={`flex items-center gap-3 rounded-[14px] border px-3 py-[11px] text-left transition ${
                      activeDocId === doc.id
                        ? 'border-[#daa97f] bg-gradient-to-b from-[#fff3e6] to-[#ffe9d6] text-[#b97336] shadow-[0_14px_24px_rgba(181,114,57,0.22)]'
                        : 'border-[#ebddcf] bg-gradient-to-b from-[#fffdf9] to-[#fff8f1] hover:-translate-y-0.5 hover:border-[#e2c3a9] hover:shadow-[0_10px_20px_rgba(97,62,30,0.12)]'
                    }`}
                    onClick={() => setActiveDocId(doc.id)}
                  >
                    <span className="flex flex-col text-[13px] font-semibold text-[#26221e]">
                      {doc.name}
                      <span className="mt-0.5 text-[12px] text-[#7f746b]">
                        {doc.size} * {doc.folderName}
                      </span>
                    </span>
                  </button>
                ))}
                {!sidebarDocs.length && (
                  <div className="mt-3 text-center text-[13px] text-[#7f746b]">
                    No documents found
                  </div>
                )}
              </>
            )}
          </aside>

          <main className="min-h-[520px] rounded-[24px] border border-[#ebdfd3] bg-gradient-to-b from-white/95 to-[#fffbf6]/95 p-4 shadow-[0_26px_60px_rgba(71,43,20,0.12),0_8px_20px_rgba(71,43,20,0.08)] lg:p-6">
            {mode === 'overview' && (
              <div className="space-y-6">
                {overviewSections.map((section) => (
                  <section key={section.id}>
                    <div className="mb-3.5 flex items-center justify-between">
                      <div className="text-[15px] font-bold text-[#3c332b]">
                        {section.title}
                      </div>
                      <button
                        className="text-[13px] font-semibold text-[#7b4a22]"
                        onClick={() => handleFolderOpen(activeFolderId)}
                      >
                        View all
                      </button>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
                      {section.items.map((item, index) => (
                        <button
                          className="w-full rounded-[18px] border border-[#ecdecf] bg-gradient-to-b from-[#fffaf5] to-[#fff4eb] p-3 text-left font-['Manrope'] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.74),0_8px_14px_rgba(96,61,28,0.08)] transition hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8),0_14px_20px_rgba(96,61,28,0.14)]"
                          key={`${section.id}-${index}`}
                          onClick={() => {
                            const doc = allDocs.find((d) => d.id === item.docId)
                            if (doc) {
                              setActiveDocId(doc.id)
                              setActiveFolderId(doc.folderId)
                              setMode('folder')
                            }
                          }}
                        >
                          <div className="mb-2.5 flex items-center justify-between text-[12px] font-semibold">
                            <span className="min-w-0 truncate text-[#26221e]">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-[#7f746b]">...</span>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <div className="h-1.5 rounded-full bg-[#e8d9cc]" />
                            <div className="h-1.5 w-[70%] rounded-full bg-[#e8d9cc]" />
                            <div className="h-1.5 rounded-full bg-[#e8d9cc]" />
                          </div>
                        </button>
                      ))}
                      {!section.items.length && (
                        <div className="py-3 text-[13px] text-[#7f746b]">
                          No files added yet
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {(mode === 'folder' || mode === 'search') && activeDoc && (
              <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div className="rounded-[20px] border border-[#ecdccc] bg-gradient-to-b from-[#f8f4ef] to-[#f6efe8] p-3">
                  <div className="mb-3 flex flex-col gap-3 rounded-[12px] border border-[#ead9c8] bg-gradient-to-b from-[#fffcf8] to-[#fff6ee] p-3.5 lg:flex-row lg:items-center lg:justify-between">
                    <span className="flex-1 truncate text-[14px] font-semibold text-[#3b3128]">
                      {activeDoc.name}
                    </span>
                    <button
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-[8px] border border-[#e6c2a4] bg-gradient-to-b from-[#fffaf5] to-[#fff7ef] px-3 py-[7px] text-[13px] font-medium text-[#b97336] transition hover:-translate-y-0.5 hover:border-[#d8a87f] hover:shadow-[0_8px_16px_rgba(107,66,30,0.15)] lg:w-auto"
                      onClick={() => window.open(activeDoc.url, '_blank')}
                      title="Open in new tab"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Open in new tab
                    </button>
                  </div>
                  <iframe
                    className="h-[520px] w-full rounded-[14px] border-0 bg-white shadow-[0_8px_22px_rgba(68,46,28,0.12)]"
                    title={activeDoc.name}
                    src={activeDoc.url}
                  />
                </div>
                <div className="rounded-[18px] border border-[#ead9c8] bg-gradient-to-b from-[#fffefc] to-[#fff8f0] p-4 shadow-[0_14px_32px_rgba(71,43,20,0.11)]">
                  <div className="mb-3 text-[14px] font-bold">Information</div>
                  <div className="flex items-center justify-between gap-3 border-b border-[#f1e8df] py-2 text-[13px]">
                    <span>Name</span>
                    <span>{activeDoc.name.replace('.pdf', '')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-b border-[#f1e8df] py-2 text-[13px]">
                    <span>Uploaded by</span>
                    <span>{activeDoc.uploadedBy}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-b border-[#f1e8df] py-2 text-[13px]">
                    <span>Uploaded date</span>
                    <span>{activeDoc.date}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-b border-[#f1e8df] py-2 text-[13px]">
                    <span>Size</span>
                    <span>{activeDoc.size}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-2 text-[13px]">
                    <span>Type</span>
                    <span>{activeDoc.type}</span>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
