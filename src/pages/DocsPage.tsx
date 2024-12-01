import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  FiFolder,
  FiFile,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiSave,
  FiTrash2
} from 'react-icons/fi';
import LoadingSpinner from '../components/Common/LoadingSpinner';

interface DocItem {
  id: string;
  title: string;
  type: 'folder' | 'document';
  content?: string;
  children?: DocItem[];
}

const DocsPage: React.FC = () => {
  const [docs, setDocs] = useState<DocItem[]>([
    {
      id: '1',
      title: 'Getting Started',
      type: 'folder',
      children: [
        {
          id: '1.1',
          title: 'Welcome Guide',
          type: 'document',
          content: 'Welcome to our documentation...'
        }
      ]
    }
  ]);
  
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedDoc?.content || '',
    editable: isEditing
  });

  const handleDocSelect = async (doc: DocItem) => {
    if (doc.type === 'document') {
      try {
        setIsLoading(true);  // Start loading
        // Perform any async operations here, like fetching document details
        setSelectedDoc(doc);
      } catch (error) {
        // Handle any errors
        console.error('Error selecting document', error);
      } finally {
        setIsLoading(false);  // Stop loading, whether successful or not
      }
    }
  };

  const renderDocTree = (items: DocItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} style={{ marginLeft: `${level * 20}px` }}>
        <button
          onClick={() => handleDocSelect(item)}
          className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50 ${
            selectedDoc?.id === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
          }`}
        >
          {item.type === 'folder' ? (
            <FiFolder className="w-4 h-4 mr-2" />
          ) : (
            <FiFile className="w-4 h-4 mr-2" />
          )}
          {item.title}
        </button>
        {item.children && renderDocTree(item.children, level + 1)}
      </div>
    ));
  };

  const addNewDocument = (parentId?: string) => {
    const newDoc: DocItem = {
      id: `${Date.now()}`, // Generate unique ID
      title: 'New Document',
      type: 'document',
      content: ''
    };

    setDocs(currentDocs => {
      // If parentId is provided, add as a child to that folder
      if (parentId) {
        return currentDocs.map(doc => {
          if (doc.id === parentId) {
            return {
              ...doc,
              children: [...(doc.children || []), newDoc]
            };
          }
          return doc;
        });
      }
      
      // Otherwise, add to root level
      return [...currentDocs, newDoc];
    });

    setSelectedDoc(newDoc);
    setIsEditing(true);
  };

  const deleteDocument = (docToDelete: DocItem) => {
    setDocs(currentDocs => {
      // Recursive function to remove document from nested structure
      const removeDoc = (docs: DocItem[]): DocItem[] => {
        return docs.filter(doc => {
          if (doc.id === docToDelete.id) return false;
          if (doc.children) {
            doc.children = removeDoc(doc.children);
          }
          return true;
        });
      };

      return removeDoc(currentDocs);
    });

    setSelectedDoc(null);
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Documentation</h2>
            <button className="p-1 hover:bg-gray-100 rounded">
              <FiPlus className="w-5 h-5 text-gray-600" onClick={() => addNewDocument()} />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>

          {/* Doc Tree */}
          <div className="overflow-y-auto">
            {renderDocTree(docs)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="large" />
          </div>
        ) : selectedDoc ? (
          <>
            {/* Document Header */}
            <div className="bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">
                  {selectedDoc.title}
                </h1>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <FiSave className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                  )}
                  <button className="px-4 py-2 text-red-600 border rounded-lg hover:bg-red-50" onClick={() => deleteDocument(selectedDoc)}>
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose max-w-none">
                <EditorContent editor={editor} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a document to view or edit
          </div>
        )}
      </div>
    </div>
  );
};

export default DocsPage;
