import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster, toast } from "sonner"

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
  const handleLevelChange = (value) => {
    setFormData((prev) => ({ ...prev, "entry.1261980991": value }))
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
    toast({
      title: "Link copied!",
      description: "The prefill link has been copied to your clipboard.",
    })
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
  }

  // Add a submit handler function after the downloadJSON function
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if required fields are filled
    if (!formData["entry.1110461061"]) {
      toast.error("Please enter the book name")
      return
    }

    // Submit the form to Google Forms
    const link = generatePrefillUrl()
    window.open(link, "_blank")

    toast.success("Form submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-[#09090B] py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Book Submission Form</h1>

        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-6">Book Details</h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="bookName" className="block text-sm font-medium text-zinc-400 mb-2">
                Book Name *
              </Label>
              <Input
                id="bookName"
                name="entry.1110461061"
                value={formData["entry.1110461061"]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                placeholder="Enter book name"
                required
              />
            </div>

            <div>
              <Label htmlFor="bookSubject" className="block text-sm font-medium text-zinc-400 mb-2">
                Book Subject
              </Label>
              <Input
                id="bookSubject"
                name="entry.1854986580"
                value={formData["entry.1854986580"]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                placeholder="Enter book subject"
              />
            </div>

            <div>
              <Label htmlFor="bookAuthor" className="block text-sm font-medium text-zinc-400 mb-2">
                Book Author
              </Label>
              <Input
                id="bookAuthor"
                name="entry.464244773"
                value={formData["entry.464244773"]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                placeholder="Enter author name"
              />
            </div>

            <div>
              <Label htmlFor="bookPictureUrl" className="block text-sm font-medium text-zinc-400 mb-2">
                Book Picture URL
              </Label>
              <Input
                id="bookPictureUrl"
                name="entry.1973984329"
                value={formData["entry.1973984329"]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                placeholder="Enter book cover image URL"
              />
            </div>

            <div>
              <Label htmlFor="level" className="block text-sm font-medium text-zinc-400 mb-2">
                Level
              </Label>
              <Select value={formData["entry.1261980991"]} onValueChange={handleLevelChange}>
                <SelectTrigger className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1cp">1CP</SelectItem>
                  <SelectItem value="2cp">2CP</SelectItem>
                  <SelectItem value="1cs">1CS</SelectItem>
                  <SelectItem value="2cs">2CS</SelectItem>
                  <SelectItem value="3cs">3CS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="googleDriveLink" className="block text-sm font-medium text-zinc-400 mb-2">
                Google Drive Link
              </Label>
              <Input
                id="googleDriveLink"
                name="entry.587928892"
                value={formData["entry.587928892"]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                placeholder="Enter Google Drive link"
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-6">Your Information</h2>

          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                Name
              </Label>
              <Input
                id="name"
                name="entry.1964885166"
                value={formData["entry.1964885166"]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="entry.64633778"
                type="email"
                value={formData["entry.64633778"]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800/50 rounded-xl border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-6">Submit Your Book</h2>

          <pre className="bg-zinc-800/50 p-4 rounded-xl text-sm text-zinc-400 overflow-auto max-h-96">
            {formData["entry.1196656032"]}
          </pre>

          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300"
            >
              <span>Submit Book</span>
            </Button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

