import jsPDF from 'jspdf'

// Builds a simple PDF report client-side from the analysis you
// already have in memory — no backend involved.
export function exportReportPdf({ fileName, report, summary }) {
  const doc = new jsPDF({ unit: 'pt' })
  const margin = 48
  let y = margin

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('UI/UX Review Report', margin, y)
  y += 22

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(90)
  doc.text(fileName, margin, y)
  y += 28

  doc.setTextColor(20)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(`Overall score: ${report.overall_score}/10  (${report.total_issues} issues)`, margin, y)
  y += 24

  if (report.is_demo) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(160, 90, 0)
    doc.text('DEMO REPORT — simulated sample findings; not an AI assessment.', margin, y)
    doc.setTextColor(20)
    y += 20
  }

  if (summary?.executive_summary) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Summary', margin, y)
    y += 16
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    const lines = doc.splitTextToSize(summary.executive_summary, 500)
    doc.text(lines, margin, y)
    y += lines.length * 13 + 12
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Issues', margin, y)
  y += 18

  report.issues.forEach((issue, i) => {
    if (y > 720) {
      doc.addPage()
      y = margin
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text(`${i + 1}. ${issue.component} — ${issue.category} (${issue.severity})`, margin, y)
    y += 14
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const desc = doc.splitTextToSize(`What's wrong: ${issue.description}`, 500)
    doc.text(desc, margin, y)
    y += desc.length * 12 + 4
    const fix = doc.splitTextToSize(`Fix: ${issue.recommendation}`, 500)
    doc.text(fix, margin, y)
    y += fix.length * 12 + 14
  })

  doc.save(`${fileName.replace(/\.[^.]+$/, '')}-ux-report.pdf`)
}
