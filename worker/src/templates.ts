export const contactSubmissionTemplate = (email: string, name: string, message: string) =>
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f8f6ff;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #8b5fbf, #6a4c93);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 30px 20px;
        }
        .warning-box {
            background-color: #f3e8ff;
            border-left: 4px solid #8b5fbf;
            padding: 15px;
            margin-bottom: 25px;
            border-radius: 4px;
        }
        .warning-title {
            color: #6a4c93;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 8px;
        }
        .warning-text {
            color: #5a4673;
            font-size: 14px;
            margin: 0;
        }
        .form-data {
            background-color: #fafafa;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .field-group {
            margin-bottom: 20px;
        }
        .field-label {
            color: #6a4c93;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
            display: block;
        }
        .field-value {
            color: #333;
            font-size: 16px;
            word-wrap: break-word;
        }
        .message-field {
            background-color: white;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #e5e5e5;
            white-space: pre-wrap;
        }
        .footer {
            background-color: #6a4c93;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 14px;
        }
        .contact-info {
            background-color: #e8d5ff;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
        }
        .contact-title {
            color: #6a4c93;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .email-link {
            color: #8b5fbf;
            text-decoration: none;
            font-weight: 500;
        }
        .email-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>📧 New Contact Form Submission</h1>
        </div>
        
        <div class="content">
            <div class="warning-box">
                <div class="warning-title">⚠️ Important Notice</div>
                <p class="warning-text">
                    Do not reply directly to this email. This is an automated system notification. 
                    To respond to the person who submitted this form, compose a new email using their contact information below.
                </p>
            </div>
            
            <div class="form-data">
                <div class="field-group">
                    <span class="field-label">Name</span>
                    <div class="field-value">${name}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Email Address</span>
                    <div class="field-value">${email}</div>
                </div>
                
                <div class="field-group">
                    <span class="field-label">Message</span>
                    <div class="field-value message-field">${message}</div>
                </div>
            </div>
            
            <div class="contact-info">
                <div class="contact-title">Quick Response Action:</div>
                <p style="margin: 0;">
                    Click here to compose a new email: 
                    <a href="mailto:${email}" class="email-link">${email}</a>
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p style="margin: 0;">Contact Form System | Automated Notification</p>
        </div>
    </div>
</body>
</html>
`

export const errorReportTemplate = (status: number, message: string, timestamp: string, url: string, agent: string, stack?: string) =>
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Error Alert</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f7fc;
        }
        
        .container {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(139, 69, 219, 0.1);
            overflow: hidden;
            border: 1px solid #e5e3f0;
        }
        
        .header {
            background: linear-gradient(135deg, #8b45db, #6d28d9);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        
        .alert-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
        
        .content {
            padding: 30px;
        }
        
        .error-details {
            background-color: #faf9fc;
            border-left: 4px solid #8b45db;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .detail-row {
            margin-bottom: 15px;
            display: flex;
            align-items: flex-start;
        }
        
        .detail-label {
            font-weight: 600;
            color: #6d28d9;
            min-width: 120px;
            margin-right: 10px;
        }
        
        .detail-value {
            flex: 1;
            word-break: break-word;
        }
        
        .status-code {
            display: inline-block;
            background-color: #dc2626;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
        }
        
        .timestamp {
            background-color: #8b45db;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .stack-trace {
            background-color: #1f2937;
            color: #f3f4f6;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.4;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
            margin-top: 10px;
        }
        
        .footer {
            background-color: #f3f0ff;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e3f0;
        }
        
        .footer p {
            margin: 0;
            color: #6b7280;
            font-size: 14px;
        }
        
        .severity-high {
            background-color: #fee2e2;
            border-left-color: #dc2626;
        }
        
        .severity-medium {
            background-color: #fef3c7;
            border-left-color: #f59e0b;
        }
        
        .severity-low {
            background-color: #f0f9ff;
            border-left-color: #3b82f6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="alert-icon">⚠️</div>
            <h1>Server Error Alert</h1>
        </div>
        
        <div class="content">
            <div class="error-details">
                <div class="detail-row">
                    <span class="detail-label">Status Code:</span>
                    <span class="detail-value">
                        <span class="status-code">${status}</span>
                    </span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Error Message:</span>
                    <span class="detail-value">${message}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Timestamp:</span>
                    <span class="detail-value">
                        <span class="timestamp">${timestamp}</span>
                    </span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Request URL:</span>
                    <span class="detail-value">${url}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">User Agent:</span>
                    <span class="detail-value">${agent}</span>
                </div>
                
                ${stack ? `
                <div class="detail-row">
                    <span class="detail-label">Stack Trace:</span>
                    <div class="detail-value">
                        <div class="stack-trace">${stack}</div>
                    </div>
                </div>`: ''}
            </div>
            
            <p style="margin-top: 25px; color: #6b7280; font-size: 14px;">
                This is an automated alert from your server monitoring system. Please investigate and resolve the issue promptly.
            </p>
        </div>
        
        <div class="footer">
            <p>Server Monitoring System | Generated at ${timestamp}</p>
        </div>
    </div>
</body>
</html>
`
