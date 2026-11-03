"use client";

import { useState } from "react";
import { 
  Upload, 
  Image as ImageIcon, 
  Film, 
  Trash2, 
  Copy, 
  Check, 
  Filter, 
  Search, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  type: "image" | "video";
  url: string;
  size: string;
  dimensions?: string;
  uploadedAt: string;
}

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "1",
    name: "reel_hook_5_ai_tools.mp4",
    type: "video",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    size: "18.4 MB",
    dimensions: "1080 x 1920 (9:16)",
    uploadedAt: "2 hours ago",
  },
  {
    id: "2",
    name: "carousel_cover_creator_os.png",
    type: "image",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    size: "2.8 MB",
    dimensions: "1080 x 1350 (4:5)",
    uploadedAt: "Yesterday",
  },
  {
    id: "3",
    name: "reel_automation_funnel_demo.mp4",
    type: "video",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    size: "34.1 MB",
    dimensions: "1080 x 1920 (9:16)",
    uploadedAt: "Nov 1, 2026",
  },
  {
    id: "4",
    name: "story_resource_lead_magnet.png",
    type: "image",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    size: "1.4 MB",
    dimensions: "1080 x 1920 (9:16)",
    uploadedAt: "Oct 30, 2026",
  },
];

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredMedia = mediaList.filter((item) => {
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. Request presigned URL from API
      const res = await fetch("/api/r2/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type || "application/octet-stream",
          fileSizeBytes: file.size,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      // 2. PUT to presigned upload URL
      await fetch(json.data.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // 3. Add to media list
      const newItem: MediaItem = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type.startsWith("video") ? "video" : "image",
        url: json.data.publicUrl,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: "Just now",
      };

      setMediaList([newItem, ...mediaList]);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteMedia = (id: string) => {
    setMediaList(mediaList.filter((m) => m.id !== id));
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-surface-container-high pb-6">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label text-[11px] uppercase tracking-wider font-semibold">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-container font-bold">Assets</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight mt-1">
            Media Library
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Zero-egress Cloudflare R2 storage for high-resolution Reels, carousels, and visual assets.
          </p>
        </div>

        {/* Upload Button */}
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-label text-xs font-semibold hover:bg-primary transition-all shadow-sm cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? "Uploading direct to R2..." : "Upload Media Asset"}</span>
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            disabled={isUploading}
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* Storage Quota Bar & Search Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high shadow-xs">
        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-surface-container-low rounded-lg border border-surface-container-high text-xs font-label">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                filterType === "all" ? "bg-surface-container-lowest text-on-surface font-bold shadow-xs" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              All Assets ({mediaList.length})
            </button>
            <button
              onClick={() => setFilterType("video")}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                filterType === "video" ? "bg-surface-container-lowest text-on-surface font-bold shadow-xs" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setFilterType("image")}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                filterType === "image" ? "bg-surface-container-lowest text-on-surface font-bold shadow-xs" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Images
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-surface-container-high w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-xs font-body text-on-surface focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-surface-container-lowest border border-surface-container-high overflow-hidden shadow-xs hover:border-outline-variant transition-all flex flex-col justify-between"
          >
            {/* Asset Preview Thumbnail */}
            <div className="relative aspect-[4/5] bg-surface-container-low overflow-hidden">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-[10px] font-label font-bold uppercase text-on-surface flex items-center gap-1 shadow-xs">
                {item.type === "video" ? <Film className="w-3 h-3 text-primary" /> : <ImageIcon className="w-3 h-3 text-tertiary" />}
                {item.type}
              </span>
            </div>

            {/* Asset Details */}
            <div className="p-3.5 space-y-2">
              <div className="font-label text-xs font-bold text-on-surface truncate" title={item.name}>
                {item.name}
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                <span>{item.size}</span>
                <span>{item.uploadedAt}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-surface-container-high flex items-center justify-between">
                <button
                  onClick={() => copyUrl(item.id, item.url)}
                  className="inline-flex items-center gap-1 text-[11px] font-label font-semibold text-primary hover:underline"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? "Copied" : "Copy URL"}</span>
                </button>

                <button
                  onClick={() => deleteMedia(item.id)}
                  className="p-1 rounded text-on-surface-variant hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
