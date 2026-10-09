require 'webrick'

root = File.expand_path(File.dirname(__FILE__))

server = WEBrick::HTTPServer.new(
  :Port => 8080,
  :DocumentRoot => root,
  :DocumentRootOptions => { :NondisclosureName => [] }
)

# Custom handler for serving files cleanly
server.mount_proc '/' do |req, res|
  path = req.path == '/' ? '/index.html' : req.path
  file_path = File.join(root, path)

  if File.file?(file_path)
    res.status = 200
    ext = File.extname(file_path).downcase
    case ext
    when '.html' then res['Content-Type'] = 'text/html; charset=utf-8'
    when '.css'  then res['Content-Type'] = 'text/css; charset=utf-8'
    when '.js'   then res['Content-Type'] = 'application/javascript; charset=utf-8'
    when '.jpg', '.jpeg' then res['Content-Type'] = 'image/jpeg'
    when '.png'  then res['Content-Type'] = 'image/png'
    when '.svg'  then res['Content-Type'] = 'image/svg+xml'
    else res['Content-Type'] = 'application/octet-stream'
    end
    res.body = File.binread(file_path)
  else
    res.status = 404
    res.body = "Not found: #{path}"
  end
end

trap('INT') { server.shutdown }
puts "Server started on http://localhost:8080"
server.start
