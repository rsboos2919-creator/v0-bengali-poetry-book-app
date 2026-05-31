import { poems, bookInfo } from '@/lib/poems'
import jsPDF from 'jspdf'

const toBengaliNumber = (num: number): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('')
}

export async function generatePDF(): Promise<void> {
  // Create PDF with A5 size for book format
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5',
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - 2 * margin

  // Add custom Bengali font support message
  pdf.setFont('helvetica', 'normal')
  
  // Cover Page
  pdf.setFontSize(8)
  pdf.setTextColor(100, 100, 100)
  pdf.text('Note: Bengali text may require proper font embedding for full support', pageWidth / 2, 10, { align: 'center' })
  
  pdf.setFontSize(28)
  pdf.setTextColor(50, 40, 30)
  pdf.text(bookInfo.title, pageWidth / 2, pageHeight / 2 - 20, { align: 'center' })
  
  pdf.setFontSize(12)
  pdf.setTextColor(100, 80, 60)
  pdf.text('কবিতা সংকলন', pageWidth / 2, pageHeight / 2, { align: 'center' })
  
  pdf.setFontSize(16)
  pdf.setTextColor(50, 40, 30)
  pdf.text(bookInfo.author, pageWidth / 2, pageHeight / 2 + 30, { align: 'center' })
  
  pdf.setFontSize(10)
  pdf.text(bookInfo.year.toString(), pageWidth / 2, pageHeight / 2 + 45, { align: 'center' })

  // Table of Contents
  pdf.addPage()
  pdf.setFontSize(18)
  pdf.setTextColor(50, 40, 30)
  pdf.text('সূচিপত্র', pageWidth / 2, 20, { align: 'center' })
  
  pdf.setFontSize(9)
  pdf.setTextColor(60, 50, 40)
  
  let tocY = 35
  const tocLineHeight = 5
  
  for (let i = 0; i < poems.length; i++) {
    const poem = poems[i]
    const pageNum = i + 3 // Cover + TOC + poem pages
    
    if (tocY > pageHeight - 20) {
      pdf.addPage()
      tocY = 20
    }
    
    const title = `${toBengaliNumber(i + 1)}. ${poem.title}`
    const pageText = toBengaliNumber(pageNum)
    
    pdf.text(title, margin, tocY)
    pdf.text(pageText, pageWidth - margin, tocY, { align: 'right' })
    
    // Dotted line
    const titleWidth = pdf.getTextWidth(title)
    const pageNumWidth = pdf.getTextWidth(pageText)
    const dotsStart = margin + titleWidth + 2
    const dotsEnd = pageWidth - margin - pageNumWidth - 2
    
    for (let x = dotsStart; x < dotsEnd; x += 2) {
      pdf.text('.', x, tocY)
    }
    
    tocY += tocLineHeight
  }

  // Poem Pages
  for (let i = 0; i < poems.length; i++) {
    const poem = poems[i]
    const pageNum = i + 3
    
    pdf.addPage()
    
    // Header
    pdf.setFontSize(8)
    pdf.setTextColor(150, 140, 130)
    pdf.text(bookInfo.title, margin, 10)
    pdf.text(toBengaliNumber(pageNum), pageWidth - margin, 10, { align: 'right' })
    
    // Title
    pdf.setFontSize(16)
    pdf.setTextColor(50, 40, 30)
    pdf.text(poem.title, pageWidth / 2, 35, { align: 'center' })
    
    // Decorative line
    pdf.setDrawColor(200, 180, 160)
    pdf.line(pageWidth / 2 - 15, 40, pageWidth / 2 + 15, 40)
    
    // Poem content
    pdf.setFontSize(11)
    pdf.setTextColor(60, 50, 40)
    
    let y = 55
    const lineHeight = 8
    
    for (const line of poem.lines) {
      if (y > pageHeight - 25) {
        pdf.addPage()
        y = 25
      }
      pdf.text(line, pageWidth / 2, y, { align: 'center' })
      y += lineHeight
    }
    
    // Footer
    pdf.setFontSize(8)
    pdf.setTextColor(150, 140, 130)
    pdf.text(bookInfo.author, pageWidth - margin, pageHeight - 10, { align: 'right' })
  }

  // About Page
  pdf.addPage()
  pdf.setFontSize(18)
  pdf.setTextColor(50, 40, 30)
  pdf.text('বই সম্পর্কে', pageWidth / 2, 20, { align: 'center' })
  
  pdf.setFontSize(10)
  pdf.setTextColor(60, 50, 40)
  
  const aboutText = pdf.splitTextToSize(bookInfo.description, contentWidth)
  pdf.text(aboutText, margin, 40)
  
  pdf.setFontSize(12)
  pdf.text('লেখক পরিচিতি', margin, 80)
  
  pdf.setFontSize(10)
  const authorText = pdf.splitTextToSize(bookInfo.aboutAuthor, contentWidth)
  pdf.text(authorText, margin, 90)

  // Save the PDF
  pdf.save('আপন-দুনিয়া.pdf')
}
