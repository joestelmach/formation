# Formation

A flow and stack layout library. Pairs well with
[Laconic](http://joestelmach.github.com/laconic/).

Formation can be used via CommonJS (Browserify):

~~~.js
var form = require('formation-js');
form.stack(...);
form.flow(...);
~~~

or by simply including the script, in which case it exposes its
functions under `$.el`. In this case, you must also include
Laconic, which is a dependency:

~~~.html
<script src="laconic.js"></script>
<script src="formation.js"></script>
<script>
  $.el.stack(...);
</script>
~~~

The NPM package name is `formation-js` because `formation` was taken.
The initials refer to Formation's author, Joe Stelmach.
