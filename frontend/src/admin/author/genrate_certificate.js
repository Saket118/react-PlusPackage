import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CertificateGenerator = () => {
  const [editorData, setEditorData] = useState('');
  const [templateImage, setTemplateImage] = useState('/path/to/default-certificate.png');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setTemplateImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleUrlLoad = () => {
    if (imageUrl) setTemplateImage(imageUrl);
  };

  return (
    <div className="container-fluid p-4">
      <h3>Certificate Generator</h3>

      <div className="d-flex align-items-center gap-3 mb-3">
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
        <button className="btn btn-primary" onClick={handleUrlLoad}>Load URL</button>
        <input
          type="file"
          accept="image/*"
          className="btn btn-outline-secondary"
          onChange={handleImageUpload}
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
            config={{
              placeholder: 'Please type here...',
            }}
          />
        </div>

        <div className="col-md-6">
          <div
            className="border p-2"
            style={{
              backgroundImage: `url(${templateImage})`,
              backgroundSize: 'cover',
              minHeight: '400px',
              position: 'relative'
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: editorData }}
              style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                color: '#000',
                fontFamily: 'serif'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
