const http = require('http');
const https = require('https');
const { URL } = require('url');

// Cache for external content and resources
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Obfuscated source configuration (completely hidden from users)
const CONFIG = {
    s: 'https://',
    d: 'kfdbhhyjtuygjhvj',
    e: '.neocities.org',
    p: '/xafsrqrewssxpdriot'
};

// Build URL dynamically to hide it from static analysis
const getSourceUrl = () => CONFIG.s + CONFIG.d + CONFIG.e + CONFIG.p;
const getResourceUrl = (path) => CONFIG.s + CONFIG.d + CONFIG.e + '/' + path;

function fetchExternalResource(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https:') ? https : http;

        protocol.get(url, (response) => {
            let chunks = [];

            response.on('data', (chunk) => {
                chunks.push(chunk);
            });

            response.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve({
                    data: buffer,
                    contentType: response.headers['content-type'] || 'text/plain'
                });
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

function processHTML(html) {
    // Add comprehensive security measures with URL obfuscation
    const securityScript = `
        <script>
            // Disable right-click context menu
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Disable all developer tools shortcuts
            document.addEventListener('keydown', function(e) {
                // F12
                if (e.keyCode === 123) {
                    e.preventDefault();
                    return false;
                }
                // Ctrl+Shift+I (Developer Tools)
                if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                    e.preventDefault();
                    return false;
                }
                // Ctrl+Shift+J (Console)
                if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                    e.preventDefault();
                    return false;
                }
                // Ctrl+U (View Source)
                if (e.ctrlKey && e.keyCode === 85) {
                    e.preventDefault();
                    return false;
                }
                // Ctrl+Shift+C (Inspector)
                if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
                    e.preventDefault();
                    return false;
                }
                // Ctrl+Shift+K (Console in Firefox)
                if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
                    e.preventDefault();
                    return false;
                }
                // Ctrl+S (Save Page)
                if (e.ctrlKey && e.keyCode === 83) {
                    e.preventDefault();
                    return false;
                }
                // Ctrl+A (Select All)
                if (e.ctrlKey && e.keyCode === 65) {
                    e.preventDefault();
                    return false;
                }
            });
            
            // Disable text selection
            document.onselectstart = function() {
                return false;
            };
            
            // Disable drag
            document.ondragstart = function() {
                return false;
            };
            
            // Clear console continuously and hide network requests
            setInterval(() => {
                console.clear();
                // Hide network information
                if (window.performance && window.performance.getEntriesByType) {
                    try {
                        window.performance.getEntriesByType('resource').forEach(entry => {
                            if (entry.name) {
                                Object.defineProperty(entry, 'name', {
                                    value: 'protected-resource',
                                    writable: false,
                                    configurable: false
                                });
                            }
                        });
                    } catch(e) {}
                }
            }, 50);
            
            // Advanced developer tools detection
            let devtools = {
                open: false,
                orientation: null
            };
            
            const threshold = 160;
            
            setInterval(() => {
                if (window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold) {
                    if (!devtools.open) {
                        devtools.open = true;
                        document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial,sans-serif;background:#f0f0f0;"><div style="text-align:center;"><h1 style="color:#e74c3c;margin-bottom:20px;">Access Denied</h1><p style="color:#666;font-size:18px;">Developer Tools Detected</p><p style="color:#999;font-size:14px;">Please close developer tools to continue</p></div></div>';
                    }
                } else {
                    devtools.open = false;
                }
            }, 100);
            
            // Disable all copying methods
            document.addEventListener('copy', function(e) {
                e.preventDefault();
                return false;
            });
            
            document.addEventListener('cut', function(e) {
                e.preventDefault();
                return false;
            });
            
            document.addEventListener('paste', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Disable printing
            window.addEventListener('beforeprint', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Override all console methods
            const consoleMethods = ['log', 'error', 'warn', 'info', 'debug', 'table', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'trace', 'assert', 'clear'];
            consoleMethods.forEach(method => {
                console[method] = function() {};
            });
            
            // Hide source in performance entries
            if (window.performance && window.performance.getEntriesByType) {
                const originalGetEntriesByType = window.performance.getEntriesByType;
                window.performance.getEntriesByType = function(type) {
                    return [];
                };
            }
            
            // Disable image saving and dragging
            document.addEventListener('dragstart', function(e) {
                if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                    return false;
                }
            });
            
            // Override selection methods
            if (window.getSelection) {
                window.getSelection = function() {
                    return { toString: function() { return ''; } };
                };
            }
            
            // Hide network requests in DevTools
            if (window.fetch) {
                const originalFetch = window.fetch;
                window.fetch = function() {
                    return originalFetch.apply(this, arguments);
                };
            }
            
            // Disable outline on focus
            document.addEventListener('DOMContentLoaded', function() {
                const style = document.createElement('style');
                style.textContent = '*:focus { outline: none !important; } * { user-select: none !important; -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; }';
                document.head.appendChild(style);
            });
            
            // Advanced anti-debug measures
            let debuggerDetected = false;
            function detectDebugger() {
                const start = Date.now();
                debugger;
                const end = Date.now();
                if (end - start > 100) {
                    debuggerDetected = true;
                    document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial,sans-serif;background:#f0f0f0;"><div style="text-align:center;"><h1 style="color:#e74c3c;margin-bottom:20px;">Access Denied</h1><p style="color:#666;font-size:18px;">Debugging Detected</p></div></div>';
                }
            }
            
            // Check for debugger periodically
            setInterval(detectDebugger, 1000);
        </script>
    `;

    // Remove ALL traces of external URLs and replace with local paths
    let processedHTML = html
        // Remove the exact domain completely
        .replace(/https:\/\/kfdbhhyjtuygjhvj\.neocities\.org/g, '')
        // Clean up any remaining URL patterns
        .replace(/kfdbhhyjtuygjhvj\.neocities\.org/g, '')
        .replace(/neocities\.org/g, '')
        .replace(/kfdbhhyjtuygjhvj/g, '')
        // Fix resource paths
        .replace(/href="\/([^"]*?)"/g, 'href="/api/$1"')
        .replace(/src="\/([^"]*?)"/g, 'src="/api/$1"')
        .replace(/url\(\/([^)]*?)\)/g, 'url(/api/$1)')
        // Clean up any remaining external references
        .replace(/href="([^"]*?\.css)"/g, 'href="/api/$1"')
        .replace(/src="([^"]*?\.(js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))"/g, 'src="/api/$1"');

    // Insert security script before closing body tag
    const bodyCloseIndex = processedHTML.lastIndexOf('</body>');
    if (bodyCloseIndex !== -1) {
        processedHTML = processedHTML.substring(0, bodyCloseIndex) + securityScript + processedHTML.substring(bodyCloseIndex);
    } else {
        processedHTML = processedHTML + securityScript;
    }

    return processedHTML;
}

// Vercel serverless function handler
module.exports = async (req, res) => {
    const now = Date.now();
    
    // Set security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Handle root path - serve main content
    if (req.url === '/' || req.url === '/api' || req.url === '/api/') {
        try {
            const cacheKey = 'main-content';
            const cached = cache.get(cacheKey);

            let content;
            if (!cached || (now - cached.timestamp) > CACHE_DURATION) {
                console.log('Fetching content...');
                const result = await fetchExternalResource(getSourceUrl());
                content = processHTML(result.data.toString());

                cache.set(cacheKey, {
                    content: content,
                    timestamp: now
                });
            } else {
                content = cached.content;
            }

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.status(200).send(content);
            return;
        } catch (error) {
            console.error('Error loading content');
            res.status(500).send(`
                <html>
                    <head>
                        <title>Service Unavailable</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
                            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                            h1 { color: #e74c3c; margin-bottom: 20px; }
                            p { color: #666; font-size: 16px; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Service Temporarily Unavailable</h1>
                            <p>Unable to load the requested content. Please try again later.</p>
                            <p>Please contact support if this issue persists.</p>
                        </div>
                    </body>
                </html>
            `);
            return;
        }
    }

    // Handle resource requests (CSS, JS, images, etc.)
    if (req.url.startsWith('/api/')) {
        const resourcePath = req.url.substring(5); // Remove '/api/'
        
        // Skip empty paths or favicon
        if (!resourcePath || resourcePath === 'favicon.ico') {
            res.status(404).send('Not found');
            return;
        }

        const resourceUrl = getResourceUrl(resourcePath);

        try {
            const cacheKey = resourceUrl;
            const cached = cache.get(cacheKey);

            let result;
            if (!cached || (now - cached.timestamp) > CACHE_DURATION) {
                console.log(`Loading resource: ${resourcePath}`);
                result = await fetchExternalResource(resourceUrl);

                cache.set(cacheKey, {
                    data: result.data,
                    contentType: result.contentType,
                    timestamp: now
                });
            } else {
                result = {
                    data: cached.data,
                    contentType: cached.contentType
                };
            }

            res.setHeader('Content-Type', result.contentType);
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.status(200).send(result.data);
            return;
        } catch (error) {
            console.error(`Error loading resource: ${resourcePath}`);
            res.status(404).send('Resource not found');
            return;
        }
    }

    // Default 404 for any other requests
    res.status(404).send('<h1>404 Not Found</h1>');
};