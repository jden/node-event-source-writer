var Source = require('./')

var source = new Source()

source.pipe(process.stdout)


source.dispatchEvent({type: 'virtual', whatever:1})
source.dispatchEvent({type: 'virtual', whatever:2})
source.dispatchEvent({type: 'virtual', whatever:3})
source.dispatchEvent({type: 'virtual', whatever:4})

source.end()