import { NextResponse } from 'next/server'
import { poems, bookInfo } from '@/lib/poems'

export async function GET() {
  const htmlContent = generatePDFHTML()

  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': 'attachment; filename="apon-duniya.html"',
    },
  })
}

function generatePDFHTML() {
  const styleCSS = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${bookInfo.title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;700&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: A5;
          margin: 20mm;
        }
        
        body {
          font-family: 'Noto Serif Bengali', serif;
          color: #3d2817;
          line-height: 1.8;
          background-color: #f5e6d3;
        }
        
        .page {
          page-break-after: always;
          min-height: 210mm;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          text-align: center;
          background-color: #f5e6d3;
        }
        
        .cover-page {
          justify-content: space-around;
          background: linear-gradient(135deg, #f5e6d3 0%, #e8d4b8 100%);
        }
        
        .cover-title {
          font-size: 48px;
          font-weight: bold;
          color: #5c3d2e;
          margin: 20px 0;
          letter-spacing: 2px;
        }
        
        .cover-subtitle {
          font-size: 18px;
          color: #8b6f47;
          margin: 15px 0;
          font-style: italic;
        }
        
        .cover-author {
          font-size: 20px;
          color: #5c3d2e;
          margin: 30px 0;
          font-weight: 500;
        }
        
        .cover-year {
          font-size: 14px;
          color: #9e8761;
        }
        
        .toc-page h1 {
          font-size: 36px;
          color: #5c3d2e;
          margin-bottom: 40px;
          border-bottom: 3px solid #c8a882;
          padding-bottom: 15px;
        }
        
        .toc-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 12px;
          border-bottom: 1px dotted #c8a882;
          text-align: left;
        }
        
        .toc-title {
          flex: 1;
        }
        
        .toc-page-num {
          margin-left: 20px;
          flex: 0 0 auto;
        }
        
        .poem-page {
          text-align: center;
          justify-content: flex-start;
          padding: 50px 30px 30px;
        }
        
        .poem-header {
          font-size: 10px;
          color: #9e8761;
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 40px;
        }
        
        .poem-title {
          font-size: 24px;
          font-weight: bold;
          color: #5c3d2e;
          margin: 30px 0 20px;
          border-bottom: 2px solid #c8a882;
          padding-bottom: 10px;
        }
        
        .poem-content {
          font-size: 13px;
          color: #3d2817;
          margin: 30px 0;
          line-height: 2;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        .poem-footer {
          font-size: 9px;
          color: #9e8761;
          margin-top: 40px;
        }
        
        .about-page h1 {
          font-size: 28px;
          color: #5c3d2e;
          margin-bottom: 30px;
        }
        
        .about-page h2 {
          font-size: 16px;
          color: #5c3d2e;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        
        .about-page p {
          font-size: 12px;
          color: #3d2817;
          line-height: 1.8;
          margin-bottom: 10px;
          text-align: justify;
        }
      </style>
    </head>
    <body>
  `

  let html = styleCSS

  // Cover Page
  html += `
    <div class="page cover-page">
      <div class="cover-title">${bookInfo.title}</div>
      <div class="cover-subtitle">কবিতা সংকলন</div>
      <div class="cover-author">${bookInfo.author}</div>
      <div class="cover-year">${bookInfo.year}</div>
    </div>
  `

  // Table of Contents
  html += `
    <div class="page toc-page">
      <h1>সূচিপত্র</h1>
      <div>
  `

  poems.forEach((poem, index) => {
    const pageNum = index + 3
    html += `
      <div class="toc-item">
        <span class="toc-title">${index + 1}. ${poem.title}</span>
        <span class="toc-page-num">${pageNum}</span>
      </div>
    `
  })

  html += `
      </div>
    </div>
  `

  // Poem Pages
  poems.forEach((poem, index) => {
    const pageNum = index + 3
    const poemText = poem.lines.join('\n')
    
    html += `
      <div class="page poem-page">
        <div class="poem-header">
          <span>${bookInfo.title}</span>
          <span>${pageNum}</span>
        </div>
        <div class="poem-title">${poem.title}</div>
        <div class="poem-content">${escapeHtml(poemText)}</div>
        <div class="poem-footer">${bookInfo.author}</div>
      </div>
    `
  })

  // About Page
  html += `
    <div class="page about-page">
      <h1>বই সম্পর্কে</h1>
      <p>${bookInfo.description}</p>
      <h2>লেখক পরিচিতি</h2>
      <p>${bookInfo.aboutAuthor}</p>
    </div>
  `

  html += `
    </body>
    </html>
  `

  return html
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
