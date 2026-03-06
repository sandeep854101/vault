import React, { useMemo, useState } from 'react'

const folders = [
  {
    id: 'intent-order',
    name: 'Intent / Order',
    meta: '265 files • 56GB',
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
    meta: '265 files • 56GB',
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
    meta: '265 files • 56GB',
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
    meta: '265 files • 56GB',
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
    items: ['Team.xls', 'Team.xls', 'Team.xls', 'Team.xls'],
  },
  {
    id: 'privacy',
    title: 'Privacy Sector',
    items: ['Team.xls', 'Team.xls', 'Team.xls', 'Team.xls'],
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
    <div className={`vault-app ${mode === 'search' ? 'is-searching' : ''}`}>
      <header className="topbar">
        <div className="brand">
          <div className="brand-title">Vault</div>
          <div className="brand-sub">Upload, store and read as you like</div>
        </div>

        <div className="search-shell">
          <button className="icon-button" onClick={handleBack} aria-label="Back">
            <span className="icon-circle">
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

          <div className="search-field">
            <span className="search-icon">
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
            />
            {query && (
              <button className="clear-button" onClick={() => setQuery('')}>
                ✕
              </button>
            )}
          </div>

          {query && (
            <div className="search-dropdown">
              {searchResults.slice(0, 4).map((doc) => (
                <button
                  key={doc.id}
                  className="search-item"
                  onClick={() => setActiveDocId(doc.id)}
                >
                  <span className="search-item-icon">🔍</span>
                  <span className="search-item-text">{doc.name}</span>
                </button>
              ))}
              {!searchResults.length && (
                <div className="search-empty">No matches found</div>
              )}
            </div>
          )}
        </div>

        <div className="top-actions">
          <button className="pill-button">
            <span className="pill-icon">
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
          <button className="pill-button">
            <span className="pill-icon">
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

      <div className="content">
        <aside className="sidebar">
          {mode === 'overview' && (
            <>
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  className={`nav-card ${
                    activeFolderId === folder.id ? 'active' : ''
                  }`}
                  onClick={() => handleFolderOpen(folder.id)}
                >
                  <span className="nav-icon">
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
                    <div className="nav-title">{folder.name}</div>
                    <div className="nav-meta">{folder.meta}</div>
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
                  className={`nav-card ${
                    activeDocId === doc.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveDocId(doc.id)}
                >
                  <span className="nav-file">
                    {doc.name}
                    <span className="nav-meta">{doc.size} • {doc.folderName}</span>
                  </span>
                </button>
              ))}
              {!sidebarDocs.length && (
                <div className="nav-empty">No documents found</div>
              )}
            </>
          )}
        </aside>

        <main className="main-panel">
          {mode === 'overview' && (
            <div className="overview">
              {overviewSections.map((section) => (
                <section key={section.id} className="overview-section">
                  <div className="section-header">
                    <div className="section-title">{section.title}</div>
                    <button
                      className="section-link"
                      onClick={() => handleFolderOpen(activeFolderId)}
                    >
                      View all
                    </button>
                  </div>
                  <div className="card-row">
                    {section.items.map((item, index) => (
                      <div className="doc-card" key={`${section.id}-${index}`}>
                        <div className="doc-head">
                          <span className="doc-name">{item}</span>
                          <span className="doc-menu">•••</span>
                        </div>
                        <div className="doc-body">
                          <div className="doc-line" />
                          <div className="doc-line short" />
                          <div className="doc-line" />
                        </div>
                      </div>
                    ))}
                    {!section.items.length && (
                      <div className="empty-note">No files added yet</div>
                    )}
                  </div>
                </section>
              ))}
            </div>
          )}

          {(mode === 'folder' || mode === 'search') && activeDoc && (
            <div className="viewer">
              <div className="preview-card">
                <iframe
                  className="doc-frame"
                  title={activeDoc.name}
                  src={activeDoc.url}
                />
              </div>
              <div className="info-card">
                <div className="info-title">Information</div>
                <div className="info-row">
                  <span>Name</span>
                  <span>{activeDoc.name.replace('.pdf', '')}</span>
                </div>
                <div className="info-row">
                  <span>Uploaded by</span>
                  <span>{activeDoc.uploadedBy}</span>
                </div>
                <div className="info-row">
                  <span>Uploaded date</span>
                  <span>{activeDoc.date}</span>
                </div>
                <div className="info-row">
                  <span>Size</span>
                  <span>{activeDoc.size}</span>
                </div>
                <div className="info-row">
                  <span>Type</span>
                  <span>{activeDoc.type}</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
