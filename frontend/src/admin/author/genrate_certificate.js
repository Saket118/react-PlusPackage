import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CertificateGenerator = () => {
  const [editorData, setEditorData] = useState('');
  const [templateImage, setTemplateImage] = useState('/path/to/default-certificate.png');
  const [imageUrl, setImageUrl] = useState('');

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTemplateImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle image loading from URL
  const handleUrlLoad = () => {
    if (imageUrl.trim()) {
      setTemplateImage(imageUrl.trim());
    }
  };

  return (
    <div className="container-fluid p-4">
      <h3>Certificate Generator</h3>

      {/* Upload or URL input */}
      <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
        <select className="form-select w-auto">
          <option value="original">Original</option>
        </select>

        <span>OR Use Image URL:</span>

        <input
          type="text"
          placeholder="Enter image URL (e.g. https://...)"
          className="form-control w-50"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleUrlLoad}>
          Load URL
        </button>

        <input
          type="file"
          accept="image/*"
          className="btn btn-outline-secondary"
          onChange={handleImageUpload}
        />
      </div>

      {/* Editor and Preview */}
      <div className="row">
        {/* Text Editor */}
        <div className="col-md-6 mb-3">
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={(event, editor) => setEditorData(editor.getData())}
            config={{
              placeholder: 'Type certificate content here...',
            }}
          />
        </div>

        {/* Live Certificate Preview */}
        <div className="col-md-6">
          <div
            className="border p-2"
            style={{
              backgroundImage: `url(${templateImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '400px',
              position: 'relative',
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: editorData }}
              style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                color: '#000',
                fontFamily: 'serif',
                backgroundColor: 'rgba(255,255,255,0.8)',
                padding: '10px',
                borderRadius: '6px',
                maxWidth: '80%',
                wordWrap: 'break-word',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
