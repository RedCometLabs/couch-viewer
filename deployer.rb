watch('.*') do |m|
  unless m[0].match(/\/.idea\//) or m[0].match(/\/.git\//)
    puts "#{m[0]} was changed."
    `couchapp push viewer`
  end
end
