import { useState, useEffect } from "react"
import { Toaster, toast } from "sonner"
import { BookOpen, User, Link, Download, Copy, Send, Image, FileText, Mail } from "lucide-react"

export default function BookSubmissionForm() {
  // State for book details - using the exact field IDs from the Google Form
  const [formData, setFormData] = useState({
    "entry.1110461061": "", // Book Name
    "entry.1854986580": "", // Book Subject
    "entry.464244773": "", // Book Author
    "entry.1973984329": "", // Book Picture URL
    "entry.1261980991": "", // Level
    "entry.587928892": "", // Google Drive Link
    "entry.1964885166": "", // Name
    "entry.64633778": "", // Email
    "entry.1196656032": "", // JSON Preview
  })

  const [activeSection, setActiveSection] = useState("book-details")

  // Update JSON preview whenever form data changes
  useEffect(() => {
    const jsonData = JSON.stringify(
      {
        bookName: formData["entry.1110461061"],
        bookSubject: formData["entry.1854986580"],
        bookAuthor: formData["entry.464244773"],
        bookPictureUrl: formData["entry.1973984329"],
        level: formData["entry.1261980991"],
        googleDriveLink: formData["entry.587928892"],
        name: formData["entry.1964885166"],
        email: formData["entry.64633778"],
      },
      null,
      2,
    )

    setFormData((prev) => ({
      ...prev,
      "entry.1196656032": jsonData,
    }))
  }, [
    formData["entry.1110461061"],
    formData["entry.1854986580"],
    formData["entry.464244773"],
    formData["entry.1973984329"],
    formData["entry.1261980991"],
    formData["entry.587928892"],
    formData["entry.1964885166"],
    formData["entry.64633778"],
  ])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle level selection
  const handleLevelChange = (e) => {
    setFormData((prev) => ({ ...prev, "entry.1261980991": e.target.value }))
  }

  // Generate Google Form prefill URL
  const generatePrefillUrl = () => {
    const baseUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSfa02MAnrABM8a1TSZt0ZhQjJXpD9faPVcewzRMbrLYWa61SQ/viewform?usp=pp_url"

    const params = new URLSearchParams()
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.append(key, encodeURIComponent(value))
    })

    return `${baseUrl}&${params.toString()}`
  }

  // Copy prefill link to clipboard
  const copyPrefillLink = () => {
    const link = generatePrefillUrl()
    navigator.clipboard.writeText(link)
    toast.success("Link copied to clipboard")
  }

  // Open Google Form with prefilled data
  const openGoogleForm = () => {
    const link = generatePrefillUrl()
    window.open(link, "_blank")
  }

  // Download JSON data
  const downloadJSON = () => {
    const jsonData = formData["entry.1196656032"]
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "book-submission.json"
    link.click()
    URL.revokeObjectURL(url)
    toast.success("JSON file downloaded")
  }

  // Add a submit handler function
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if required fields are filled
    if (!formData["entry.1110461061"]) {
      toast.error("Please enter the book name")
      return
    }

    // Submit the form to Google Forms
    openGoogleForm()
    toast.success("Form submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Book Submission Form</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Submit your book details to our library collection. All fields marked with * are required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setActiveSection("book-details")}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              activeSection === "book-details"
                ? "bg-zinc-800/80 border border-zinc-700 shadow-lg"
                : "bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/40"
            }`}
          >
            <BookOpen className="w-5 h-5 text-muted-foreground" />
            <span>Book Details</span>
          </button>

          <button
            onClick={() => setActiveSection("your-info")}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              activeSection === "your-info"
                ? "bg-zinc-800/80 border border-zinc-700 shadow-lg"
                : "bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/40"
            }`}
          >
            <User className="w-5 h-5 text-muted-foreground" />
            <span>Your Information</span>
          </button>

          <button
            onClick={() => setActiveSection("preview-submit")}
            className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
              activeSection === "preview-submit"
                ? "bg-zinc-800/80 border border-zinc-700 shadow-lg"
                : "bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-800/40"
            }`}
          >
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span>Preview & Submit</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Book Details Section */}
          <div className={`${activeSection === "book-details" ? "block" : "hidden"}`}>
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-zinc-800">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-6 h-6 text-muted-foreground" />
                <h2 className="text-2xl font-bold">Book Details</h2>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-zinc-300 transition-colors">
                    Book Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                      name="entry.1110461061"
                      value={formData["entry.1110461061"]}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                      placeholder="Enter book name"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-zinc-300 transition-colors">
                    Book Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                      name="entry.1854986580"
                      value={formData["entry.1854986580"]}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                      placeholder="Enter book subject"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-zinc-300 transition-colors">
                    Book Author
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                      name="entry.464244773"
                      value={formData["entry.464244773"]}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                      placeholder="Enter author name"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-zinc-300 transition-colors">
                    Book Picture URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                      name="entry.1973984329"
                      value={formData["entry.1973984329"]}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                      placeholder="Enter book cover image URL"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-zinc-300 transition-colors">
                    Level
                  </label>
                  <div className="relative">
                    <select
                      value={formData["entry.1261980991"]}
                      onChange={handleLevelChange}
                      className="w-full px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                    >
                      <option value="" disabled>
                        Select level
                      </option>
                      <option value="1cp">1CP</option>
                      <option value="2cp">2CP</option>
                      <option value="1cs">1CS</option>
                      <option value="2cs">2CS</option>
                      <option value="3cs">3CS</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-zinc-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-zinc-300 transition-colors">
                    Google Drive Link
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                      name="entry.587928892"
                      value={formData["entry.587928892"]}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                      placeholder="Enter Google Drive link"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveSection("your-info")}
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
                  >
                    Next
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Your Information Section */}
          <div className={`${activeSection === "your-info" ? "block" : "hidden"}`}>
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-zinc-800">
              <div className="flex items-center gap-3 mb-8">
                <User className="w-6 h-6 text-muted-foreground" />
                <h2 className="text-2xl font-bold">Your Information</h2>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-zinc-300 transition-colors">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                      name="entry.1964885166"
                      value={formData["entry.1964885166"]}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-zinc-400 mb-2 group-focus-within:text-zinc-300 transition-colors">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                      name="entry.64633778"
                      type="email"
                      value={formData["entry.64633778"]}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveSection("book-details")}
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl flex items-center gap-2 transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection("preview-submit")}
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
                  >
                    Next
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Submit Section */}
          <div className={`${activeSection === "preview-submit" ? "block" : "hidden"}`}>
            <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-zinc-800">
              <div className="flex items-center gap-3 mb-8">
                <FileText className="w-6 h-6 text-muted-foreground" />
                <h2 className="text-2xl font-bold">Preview & Submit</h2>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      type="button"
                      onClick={copyPrefillLink}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all"
                      title="Copy link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={downloadJSON}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all"
                      title="Download JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="bg-zinc-800/50 p-6 rounded-xl text-sm text-zinc-300 overflow-auto max-h-96 border border-zinc-700">
                    {formData["entry.1196656032"]}
                  </pre>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveSection("your-info")}
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl flex items-center gap-2 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl flex items-center gap-2 transition-all shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Submit Book
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Book Preview Card - Optional */}
        {formData["entry.1110461061"] && formData["entry.1973984329"] && (
          <div className="mt-8 bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-medium mb-4">Book Preview</h3>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-40 h-56 bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center border border-zinc-700">
                {formData["entry.1973984329"] ? (
                  <img
                    src={formData["entry.1973984329"] || "/placeholder.svg"}
                    alt={formData["entry.1110461061"]}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://via.placeholder.com/160x224?text=No+Image"
                    }}
                  />
                ) : (
                  <Image className="w-12 h-12 text-zinc-600" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold">{formData["entry.1110461061"]}</h4>
                {formData["entry.464244773"] && <p className="text-zinc-400">by {formData["entry.464244773"]}</p>}
                {formData["entry.1854986580"] && (
                  <p className="mt-2 text-zinc-300">Subject: {formData["entry.1854986580"]}</p>
                )}
                {formData["entry.1261980991"] && (
                  <div className="mt-2 inline-block px-3 py-1 bg-zinc-800 rounded-full text-sm border border-zinc-700">
                    Level: {formData["entry.1261980991"].toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  )
}

