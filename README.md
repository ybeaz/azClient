## Recomended type of events

| Event to capture |      DOM Event type      | `value` field |
| ---------------- | :----------------------: | :-----------: |
| lookable         | onmouseout, onmouseleave |      no       |
| clickable        |          click           |      no       |
| inputable        |           blur           |      yes      |
| checkable        |          change          |      no       |
| selectable       |          change          |      yes      |

## Attribute specs

| Attribute |  Type  |  Required   |
| --------- | :----: | :---------: |
| type      | string |     yes     |
| name      | string | recommended |
| value     | string |  optional   |
| level     | number |  optional   |

> Type string should be single quoted
>
> Type number should NOT be quoted
>
> !Important: `value` is taken from event.target.value if not specified directly in the "string object"

## ClassName Pattern to attach to an element

`<div class="someClass az_{'type':'mouseout','name':'div: myName','value':'myValue','level':1}">My JavaScript</h1>`

> `level` should be number parsable and optional

## Prefix for analytics

Prefix by default is `az_` But this is configurable variable. You can change this value in `src/Constants/analyticsPrefix.ts`
