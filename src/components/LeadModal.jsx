import { useState, useRef, useEffect } from 'react';
import { 
  X, 
  CheckCircle, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  ChevronDown, 
  ArrowRight, 
  Paperclip,
  Send,
  IndianRupee,
  Calendar,
  MapPin,
  CreditCard,
  Camera,
  Upload,
  RotateCcw,
  Check,
  Briefcase,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import './LeadModal.css';

export default function LeadModal({ isOpen, onClose, initialType = 'general' }) {
  const [serviceType] = useState(initialType);

  // FormSubmit configuration
  const recipientEmail = import.meta.env.VITE_FORMSUBMIT_EMAIL || 'anwarkhan84088@gmail.com';
  const formSubmitAction = `https://formsubmit.co/${encodeURIComponent(recipientEmail.trim())}`;
  const redirectUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?submitted=true`
    : 'https://gigrupee.com?submitted=true';

  const [isSubmitting, setIsSubmitting] = useState(false);

  // BPO Form State
  const [bpoForm, setBpoForm] = useState({
    companyName: '',
    contactPerson: '',
    businessEmail: '',
    phoneNumber: '',
    serviceRequired: '',
    industry: '',
    teamSize: '',
    engagementModel: '',
    additionalRequirements: ''
  });
  const [bpoFile, setBpoFile] = useState(null);

  // Loan Application State (Steps 1-4)
  const [loanForm, setLoanForm] = useState({
    loanAmount: '50000',
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    pincode: '',
    employmentType: '',
    monthlyIncome: '',
    employerName: '',
    panNumber: '',
    consent: true
  });
  const [loanFile, setLoanFile] = useState(null);

  // Live Selfie State & Refs
  const [loanSelfie, setLoanSelfie] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const selfieFileInputRef = useRef(null);

  // General Form State
  const [generalForm, setGeneralForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Helper: Convert base64 dataURL to File
  const dataURLtoFile = (dataurl, filename = 'selfie.jpg') => {
    try {
      const arr = dataurl.split(',');
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } catch (err) {
      console.warn('Error converting dataURL to File:', err);
      return null;
    }
  };

  const startCamera = async () => {
    setCameraError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device/browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Camera access unavailable. You can upload an image file instead.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    // Mirror for natural selfie look
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setLoanSelfie(dataUrl);

    // Populate file input with real binary file for multipart form post
    try {
      const file = dataURLtoFile(dataUrl, `applicant_selfie_${Date.now()}.jpg`);
      if (file && selfieFileInputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(file);
        selfieFileInputRef.current.files = dt.files;
      }
    } catch (err) {
      console.warn('Could not populate selfie file input:', err);
    }

    stopCamera();
  };

  const handleSelfieUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setLoanSelfie(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);

      // Also assign to the main selfie file input
      if (selfieFileInputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(file);
        selfieFileInputRef.current.files = dt.files;
      }
    }
  };

  const removeSelfie = () => {
    setLoanSelfie(null);
    if (selfieFileInputRef.current) {
      selfieFileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  const isBPO = serviceType === 'bpo';
  const isLending = serviceType === 'lending';
  const isSuccess = initialType === 'success';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="modal-success-state">
            <CheckCircle size={56} className="success-icon" />
            <h3 className="success-title">Thank You!</h3>
            <p className="success-desc">
              Your submission has been received successfully. Our team will review your details and contact you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {/* 1. BPO APPLICATION FORM */}
            {isBPO && (
              <div className="bpo-modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Request a BPO Solution</h3>
                  <p className="modal-subtitle">
                    Tell us your requirements and our operations team will get back to you within 24 hours.
                  </p>
                </div>

                <form 
                  action={formSubmitAction} 
                  method="POST" 
                  encType="multipart/form-data" 
                  className="modal-form"
                  onSubmit={() => setIsSubmitting(true)}
                >
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value={redirectUrl} />
                  <input type="hidden" name="_subject" value={`New BPO Requirement: ${bpoForm.companyName || 'GigRupee Lead'}`} />
                  <input type="hidden" name="Form Type" value="BPO Team Solution Inquiry" />

                  {/* Company Name */}
                  <div className="form-group">
                    <label className="field-label">Company Name *</label>
                    <div className="input-icon-wrapper">
                      <Building2 size={18} className="input-icon" />
                      <input 
                        type="text" 
                        name="Company Name"
                        placeholder="Enter your company or organization name" 
                        required 
                        value={bpoForm.companyName}
                        onChange={(e) => setBpoForm({ ...bpoForm, companyName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div className="form-group">
                    <label className="field-label">Contact Person *</label>
                    <div className="input-icon-wrapper">
                      <User size={18} className="input-icon" />
                      <input 
                        type="text" 
                        name="Contact Person"
                        placeholder="Full name of contact person" 
                        required 
                        value={bpoForm.contactPerson}
                        onChange={(e) => setBpoForm({ ...bpoForm, contactPerson: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Business Email & Phone in responsive grid */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Business Email *</label>
                      <div className="input-icon-wrapper">
                        <Mail size={18} className="input-icon" />
                        <input 
                          type="email" 
                          name="Business Email"
                          placeholder="name@company.com" 
                          required 
                          value={bpoForm.businessEmail}
                          onChange={(e) => setBpoForm({ ...bpoForm, businessEmail: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="field-label">Phone Number *</label>
                      <div className="input-icon-wrapper">
                        <Phone size={18} className="input-icon" />
                        <input 
                          type="tel" 
                          name="Phone Number"
                          placeholder="Enter 10-digit mobile number" 
                          required 
                          value={bpoForm.phoneNumber}
                          onChange={(e) => setBpoForm({ ...bpoForm, phoneNumber: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Required */}
                  <div className="form-group">
                    <label className="field-label">Service Required</label>
                    <div className="select-wrapper">
                      <select
                        name="Service Required"
                        required
                        value={bpoForm.serviceRequired}
                        onChange={(e) => setBpoForm({ ...bpoForm, serviceRequired: e.target.value })}
                      >
                        <option value="" disabled>Select BPO Service</option>
                        <option value="Inbound Customer Support">Inbound Customer Support</option>
                        <option value="Outbound Sales & Telecalling">Outbound Sales & Telecalling</option>
                        <option value="Technical Support & Helpdesk">Technical Support & Helpdesk</option>
                        <option value="Chat & Email Support">Chat & Email Support</option>
                        <option value="Back Office & Data Entry">Back Office & Data Entry</option>
                        <option value="Omnichannel / Dedicated Team">Omnichannel / Dedicated Team</option>
                      </select>
                      <ChevronDown size={18} className="select-chevron" />
                    </div>
                  </div>

                  {/* Industry */}
                  <div className="form-group">
                    <label className="field-label">Industry</label>
                    <div className="select-wrapper">
                      <select
                        name="Industry"
                        required
                        value={bpoForm.industry}
                        onChange={(e) => setBpoForm({ ...bpoForm, industry: e.target.value })}
                      >
                        <option value="" disabled>Select Industry</option>
                        <option value="Banking & Fintech">Banking & Fintech</option>
                        <option value="E-commerce & Retail">E-commerce & Retail</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Travel & Hospitality">Travel & Hospitality</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown size={18} className="select-chevron" />
                    </div>
                  </div>

                  {/* Team Size */}
                  <div className="form-group">
                    <label className="field-label">Team Size</label>
                    <div className="select-wrapper">
                      <select
                        name="Team Size"
                        required
                        value={bpoForm.teamSize}
                        onChange={(e) => setBpoForm({ ...bpoForm, teamSize: e.target.value })}
                      >
                        <option value="" disabled>Select Team Size</option>
                        <option value="1–10 agents">1–10 agents</option>
                        <option value="11–25 agents">11–25 agents</option>
                        <option value="26–50 agents">26–50 agents</option>
                        <option value="50+ agents">50+ agents</option>
                      </select>
                      <ChevronDown size={18} className="select-chevron" />
                    </div>
                  </div>

                  {/* Engagement Model */}
                  <div className="form-group">
                    <label className="field-label">Engagement Model</label>
                    <div className="select-wrapper">
                      <select
                        name="Engagement Model"
                        required
                        value={bpoForm.engagementModel}
                        onChange={(e) => setBpoForm({ ...bpoForm, engagementModel: e.target.value })}
                      >
                        <option value="" disabled>Select Model</option>
                        <option value="Dedicated Monthly Team">Dedicated Monthly Team</option>
                        <option value="Shared / Pay-per-ticket">Shared / Pay-per-ticket</option>
                        <option value="Project-based / Seasonal">Project-based / Seasonal</option>
                      </select>
                      <ChevronDown size={18} className="select-chevron" />
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div className="form-group">
                    <label className="field-label">Additional Requirements</label>
                    <textarea 
                      name="Additional Requirements"
                      rows="3" 
                      placeholder="Describe your process, shift timings, languages needed, or custom requirements..."
                      value={bpoForm.additionalRequirements}
                      onChange={(e) => setBpoForm({ ...bpoForm, additionalRequirements: e.target.value })}
                    />
                  </div>

                  {/* File Attachment */}
                  <div className="form-group">
                    <label className="field-label">Attach Project Brief / RFP (Optional)</label>
                    <div className="file-upload-wrapper">
                      <label className="file-upload-box">
                        <Paperclip size={18} className="file-icon" />
                        <span className="file-upload-text">
                          {bpoFile ? bpoFile.name : 'Choose file (PDF, DOCX, JPG, PNG up to 10MB)'}
                        </span>
                        <input 
                          type="file" 
                          name="attachment"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="file-hidden-input"
                          onChange={(e) => setBpoFile(e.target.files[0] || null)}
                        />
                      </label>
                      {bpoFile && (
                        <button 
                          type="button" 
                          className="file-remove-btn"
                          onClick={() => setBpoFile(null)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-bpo-submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinner-icon" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* 2. APPLY FOR LOAN FORM (Steps 1-4) */}
            {isLending && (
              <div className="loan-modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Apply for a Loan</h3>
                  <p className="modal-subtitle">
                    Fast & transparent digital lending tailored for gig workers, salaried professionals & businesses.
                  </p>
                </div>

                <form 
                  action={formSubmitAction} 
                  method="POST" 
                  encType="multipart/form-data" 
                  className="modal-form"
                  onSubmit={() => setIsSubmitting(true)}
                >
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value={redirectUrl} />
                  <input type="hidden" name="_subject" value={`New Loan Application: ₹${Number(loanForm.loanAmount).toLocaleString('en-IN')} - ${loanForm.fullName || 'Applicant'}`} />
                  <input type="hidden" name="Form Type" value="Instant Loan Application" />

                  {/* SECTION 1: Personal Details */}
                  <div className="loan-section-header">
                    <span className="loan-section-icon">
                      <User size={15} />
                    </span>
                    <h4 className="loan-section-title">Personal Details</h4>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Full Name (as per PAN Card) *</label>
                    <div className="input-icon-wrapper">
                      <User size={18} className="input-icon" />
                      <input 
                        type="text" 
                        name="Full Name"
                        placeholder="e.g. Rajesh Kumar" 
                        required 
                        value={loanForm.fullName}
                        onChange={(e) => setLoanForm({ ...loanForm, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Mobile Number *</label>
                      <div className="input-icon-wrapper">
                        <Phone size={18} className="input-icon" />
                        <input 
                          type="tel" 
                          name="Mobile Number"
                          placeholder="Enter 10-digit mobile number" 
                          required 
                          value={loanForm.phone}
                          onChange={(e) => setLoanForm({ ...loanForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="field-label">Email Address *</label>
                      <div className="input-icon-wrapper">
                        <Mail size={18} className="input-icon" />
                        <input 
                          type="email" 
                          name="Email Address"
                          placeholder="name@gmail.com" 
                          required 
                          value={loanForm.email}
                          onChange={(e) => setLoanForm({ ...loanForm, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Date of Birth *</label>
                      <div className="input-icon-wrapper">
                        <Calendar size={18} className="input-icon" />
                        <input 
                          type="date" 
                          name="Date of Birth"
                          required 
                          value={loanForm.dob}
                          onChange={(e) => setLoanForm({ ...loanForm, dob: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="field-label">City / Pincode *</label>
                      <div className="input-icon-wrapper">
                        <MapPin size={18} className="input-icon" />
                        <input 
                          type="text" 
                          name="City or Pincode"
                          placeholder="e.g. 400001, Mumbai" 
                          required 
                          value={loanForm.pincode}
                          onChange={(e) => setLoanForm({ ...loanForm, pincode: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Loan Requirements */}
                  <div className="loan-section-header">
                    <span className="loan-section-icon">
                      <IndianRupee size={15} />
                    </span>
                    <h4 className="loan-section-title">Loan Requirements</h4>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Requested Loan Amount (₹) *</label>
                    <div className="input-icon-wrapper">
                      <IndianRupee size={18} className="input-icon" />
                      <input 
                        type="number" 
                        name="Requested Loan Amount"
                        min="5000"
                        max="1000000"
                        step="1000"
                        placeholder="e.g. 50000" 
                        required 
                        value={loanForm.loanAmount}
                        onChange={(e) => setLoanForm({ ...loanForm, loanAmount: e.target.value })}
                      />
                    </div>
                    <div className="amount-chips">
                      {['10000', '25000', '50000', '100000', '250000'].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={`chip-btn ${loanForm.loanAmount === amt ? 'chip-active' : ''}`}
                          onClick={() => setLoanForm({ ...loanForm, loanAmount: amt })}
                        >
                          ₹{Number(amt).toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: Employment & Income */}
                  <div className="loan-section-header">
                    <span className="loan-section-icon">
                      <Briefcase size={15} />
                    </span>
                    <h4 className="loan-section-title">Employment & Income</h4>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Employment Type *</label>
                    <div className="select-wrapper">
                      <select
                        name="Employment Type"
                        required
                        value={loanForm.employmentType}
                        onChange={(e) => setLoanForm({ ...loanForm, employmentType: e.target.value })}
                      >
                        <option value="" disabled>Select Employment Type</option>
                        <option value="Gig Worker / Delivery Partner">Gig Worker / Delivery Partner (Swiggy, Zomato, Uber, etc.)</option>
                        <option value="Salaried (Private / Government)">Salaried (Private / Government)</option>
                        <option value="Self-Employed / Business Owner">Self-Employed / Business Owner</option>
                        <option value="Freelancer / Contractor">Freelancer / Independent Contractor</option>
                      </select>
                      <ChevronDown size={18} className="select-chevron" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Monthly In-Hand Income (₹) *</label>
                      <div className="input-icon-wrapper">
                        <IndianRupee size={18} className="input-icon" />
                        <input 
                          type="number" 
                          name="Monthly In-Hand Income"
                          placeholder="e.g. 25000" 
                          required 
                          value={loanForm.monthlyIncome}
                          onChange={(e) => setLoanForm({ ...loanForm, monthlyIncome: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="field-label">Company / Platform *</label>
                      <div className="input-icon-wrapper">
                        <Building2 size={18} className="input-icon" />
                        <input 
                          type="text" 
                          name="Company or Platform"
                          placeholder="e.g. Swiggy, TCS, Self" 
                          required 
                          value={loanForm.employerName}
                          onChange={(e) => setLoanForm({ ...loanForm, employerName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: KYC Verification */}
                  <div className="loan-section-header">
                    <span className="loan-section-icon">
                      <ShieldCheck size={15} />
                    </span>
                    <h4 className="loan-section-title">KYC Verification</h4>
                  </div>

                  <div className="form-group">
                    <label className="field-label">PAN Card Number *</label>
                    <div className="input-icon-wrapper">
                      <CreditCard size={18} className="input-icon" />
                      <input 
                        type="text" 
                        name="PAN Card Number"
                        placeholder="e.g. ABCDE1234F" 
                        required 
                        maxLength={10}
                        style={{ textTransform: 'uppercase' }}
                        value={loanForm.panNumber}
                        onChange={(e) => setLoanForm({ ...loanForm, panNumber: e.target.value.toUpperCase() })}
                      />
                    </div>
                  </div>

                  {/* Applicant Selfie Verification */}
                  <div className="form-group">
                    <label className="field-label">Applicant Selfie (Live Photo / Upload) *</label>
                    <p className="field-hint">
                      Capture a clear photo of your face directly with your camera, or upload a recent selfie.
                    </p>

                    {/* Hidden input to hold binary selfie file for form submit */}
                    <input 
                      ref={selfieFileInputRef} 
                      type="file" 
                      name="applicant_selfie" 
                      style={{ display: 'none' }} 
                    />

                    {/* Case 1: Camera is live */}
                    {isCameraOpen && (
                      <div className="selfie-camera-box">
                        <div className="camera-viewfinder">
                          <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            className="selfie-video"
                          />
                          <div className="viewfinder-circle-overlay" />
                        </div>
                        <div className="camera-controls">
                          <button 
                            type="button" 
                            className="btn-capture-selfie"
                            onClick={capturePhoto}
                          >
                            <Camera size={18} />
                            <span>Click Photo</span>
                          </button>
                          <button 
                            type="button" 
                            className="btn-cancel-camera"
                            onClick={stopCamera}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Case 2: Selfie captured/uploaded */}
                    {!isCameraOpen && loanSelfie && (
                      <div className="selfie-preview-card">
                        <img src={loanSelfie} alt="Applicant Selfie" className="selfie-img-thumb" />
                        <div className="selfie-meta">
                          <span className="selfie-status-tag">
                            <Check size={14} /> Selfie Captured
                          </span>
                        </div>
                        <button 
                          type="button" 
                          className="file-remove-btn"
                          onClick={removeSelfie}
                        >
                          <RotateCcw size={14} /> Retake
                        </button>
                      </div>
                    )}

                    {/* Case 3: No selfie yet */}
                    {!isCameraOpen && !loanSelfie && (
                      <div className="selfie-options-grid">
                        <button 
                          type="button" 
                          className="selfie-action-card action-camera"
                          onClick={startCamera}
                        >
                          <Camera size={20} className="selfie-action-icon" />
                          <span className="action-title">Click Instant Photo</span>
                        </button>

                        <label className="selfie-action-card action-upload">
                          <Upload size={20} className="selfie-action-icon" />
                          <span className="action-title">Upload Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            capture="user"
                            className="file-hidden-input"
                            onChange={handleSelfieUpload}
                          />
                        </label>
                      </div>
                    )}

                    {cameraError && (
                      <div className="camera-error-msg">{cameraError}</div>
                    )}
                  </div>

                  {/* KYC Document Upload (Optional) */}
                  <div className="form-group">
                    <label className="field-label">Upload KYC / Salary Slip / Statement (Optional)</label>
                    <div className="file-upload-wrapper">
                      <label className="file-upload-box file-upload-box-blue">
                        <Paperclip size={18} className="file-icon-blue" />
                        <span className="file-upload-text">
                          {loanFile ? loanFile.name : 'Attach Document (PDF, JPG, PNG up to 10MB)'}
                        </span>
                        <input 
                          type="file" 
                          name="attachment"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="file-hidden-input"
                          onChange={(e) => setLoanFile(e.target.files[0] || null)}
                        />
                      </label>
                      {loanFile && (
                        <button 
                          type="button" 
                          className="file-remove-btn"
                          onClick={() => setLoanFile(null)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="consent-row">
                    <input 
                      type="checkbox" 
                      id="loan-consent" 
                      name="Consent to Credit Verification"
                      value="Authorized"
                      required 
                      checked={loanForm.consent}
                      onChange={(e) => setLoanForm({ ...loanForm, consent: e.target.checked })}
                    />
                    <label htmlFor="loan-consent" className="consent-label">
                      I authorize GigRupee and its RBI-registered lending partners to verify my details and fetch my credit information for this loan inquiry.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-loan-submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinner-icon" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Loan Application</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* 3. GENERAL CONTACT VIEW */}
            {!isBPO && !isLending && (
              <div className="general-modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Get in Touch with GigRupee</h3>
                  <p className="modal-subtitle">
                    Fill in your details and our team will reach out to you promptly.
                  </p>
                </div>

                <form 
                  action={formSubmitAction} 
                  method="POST" 
                  encType="multipart/form-data" 
                  className="modal-form"
                  onSubmit={() => setIsSubmitting(true)}
                >
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value={redirectUrl} />
                  <input type="hidden" name="_subject" value={`New General Inquiry from ${generalForm.name || 'Visitor'}`} />
                  <input type="hidden" name="Form Type" value="General Inquiry" />

                  <div className="form-group">
                    <label className="field-label">Full Name *</label>
                    <div className="input-icon-wrapper">
                      <User size={18} className="input-icon" />
                      <input 
                        type="text" 
                        name="Full Name"
                        placeholder="e.g. Rahul Sharma" 
                        required 
                        value={generalForm.name}
                        onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Mobile Number *</label>
                      <div className="input-icon-wrapper">
                        <Phone size={18} className="input-icon" />
                        <input 
                          type="tel" 
                          name="Mobile Number"
                          placeholder="Enter 10-digit mobile number" 
                          required 
                          value={generalForm.phone}
                          onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="field-label">Email Address *</label>
                      <div className="input-icon-wrapper">
                        <Mail size={18} className="input-icon" />
                        <input 
                          type="email" 
                          name="Email Address"
                          placeholder="name@company.com" 
                          required 
                          value={generalForm.email}
                          onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Requirement / Notes</label>
                    <textarea 
                      name="Requirement / Notes"
                      rows="3" 
                      placeholder="Tell us about your requirement or inquiry..."
                      value={generalForm.message}
                      onChange={(e) => setGeneralForm({ ...generalForm, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-modal-submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="spinner-icon" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
