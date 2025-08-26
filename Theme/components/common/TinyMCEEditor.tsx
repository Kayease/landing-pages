'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Editor component
const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then(mod => ({ default: mod.Editor })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center">
        <div className="text-slate-500 dark:text-slate-400">Loading editor...</div>
      </div>
    )
  }
)

interface TinyMCEEditorProps {
  value: string
  onChange: (content: string) => void
  height?: number
  placeholder?: string
}

export function TinyMCEEditor({ 
  value, 
  onChange, 
  height = 500, 
  placeholder = "Start writing your content..." 
}: TinyMCEEditorProps) {
  const editorRef = useRef<any>(null)

  return (
    <div className="border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        init={{
          height: height,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
          ],
          toolbar: 'undo redo | blocks | bold italic forecolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | ' +
            'link image media | code preview | help',
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
              font-size: 14px; 
              line-height: 1.6;
              color: #334155;
            }
          `,
          skin: 'oxide',
          content_css: 'default',
          branding: false,
          promotion: false,
          statusbar: false,
          resize: false,
          convert_urls: false,
          relative_urls: false,
          paste_data_images: true,
          image_advtab: true,
          image_caption: true,
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
          contextmenu: 'link image table',
          placeholder: placeholder,
          setup: (editor: any) => {
            editor.on('keyup change paste', () => {
              const content = editor.getContent()
              onChange(content)
            })
          }
        }}
        onEditorChange={(content: string) => {
          onChange(content)
        }}
      />
    </div>
  )
}
