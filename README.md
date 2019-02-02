# mask-properties

```javascript
import { mask } from "mask-properties"

const person = {
  name: 'Jim',
  birthday: '1962-01-17',
  credits: {
    actor: [],
    writer: []
  }
}

mask(person, { name: true, credits: { writer: true } })
// { name: 'Jim', credits: { writer: [] } }
```
