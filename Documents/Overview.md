# Problem Overview
Instead of re-inventing the same code, what approach would allow for code reuse? Said differently, would a developer be able to code a single HTML component (bundled with CSS and JS) that could allow for faster development time in future projects?

<b>Recommended Reading:</b>
The [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/) allows a developer to create reusable components.

Consider an HTML component with dynamic data: 
```
<div>
  <!-- Rendered data -->
</div>
```

The browser DOM renders data, where the data aligns to specific the use case.

Ideally, developers would work with a high-level abstraction, instead:
```
<clock>
  <!-- Rendered clock -->
</clock>
```

As a clock ticks, the time changes. Each time-step change updates based on internal DOM state. Moreover, the state could update via REST (or other HTTP calls). Consider a `uuid` - where this value is used within the JavaScript/TypeScript of the Web Component:

```
<clock config="{uuid}">
  <!-- Rendered clock -->
</clock>
```

In this example, the `config` paramater makes use of the `uuid` value to make a REST call. 

<hr/>
<b style="color: red">IMPORTANT:</b> The server and client need to have a shared approach/purpose to managing the `uuid` (as a pointer to configuration data). A common pattern would be to have a mapping of `uuid` values to data:
<br/>
<br/>

The `uuid` could be used for many use cases, and a few ideas include:
- A previously run query
- Server-side data (to send less data over an HTTP call)
- Other configuration for the HTTP call 

The `uuid` is optional, in some cases, and could be included with standard REST patterns (e.g. `POST /data/` with a JSON request body)

```
`uuid`: { (data) }
```
This 'uuid/data' mapping, based on the use case, might be stored via the client when the DOM renders (loaded from local JSON files) or via the server through an initial REST API call. In both cases, the mapping is stored in the browser memory.

<hr/>

If the `uuid` parameter is missing, the `<clock>` would handle state changes without a REST call.

## User Interface Approaches
Many have approached building Web Components, so implementation of the Web Component varies by framework. Consider these sources for further reading:
- [Shadow DOM Example](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
- [Angular Approach](https://angular.io/api/core/ViewEncapsulation#ShadowDom)
- [React Approach](https://reactjs.org/docs/web-components.html)
- [Lit Approach](https://gist.githubusercontent.com/sorvell/48f4b7be35c8748e8f6db5c66d36ee29/raw/67346e4e8bc4c81d5a7968d18f0a6a8bc00d792e/index.html)
- [Other Libraries](https://www.webcomponents.org/libraries)

## Server Interfaces
Consider a simple REST call response from a server

**GET /time/{uuid}**
<br>
Get the current time <br>
```
{
  "milliseconds": <float>,
}
```

Moreover, the server could read the time from any datasource. Of course, in this simple example it would be more efficient to calculate the time within the server programming language. But, in more complex cases, various parsers could combine data from multiple datasources:

**GET /data**
<br>
Get the complex data aggregated from multiple data sources <br>
```
{
    "data": {
        // Server data
    },
    "timestamp": <float>, // Date format
    // Other server data
}
```

## Summary
A developer creates a reusuable component, like a `<clock>` which has a `config` parameter set to the value of `uuid` (as a pointer to configuration data):

```
<clock config="{uuid}">
  <!-- Rendered clock -->
</clock>
```

An HTTP call (inside of the `<clock>` Web Component) calls the server: `GET /time/{uuid}`

**GET /time/{uuid}**
<br>
Get the current time <br>
```
{
  "milliseconds": <float>,
}
```

The DOM renders the `<clock>` based on the CSS styles of the Web Components, but a basic render might look like this:

<hr/>
3:20 PM (14 JAN 2023)
<hr/>

## Additional Ideas
Most web components would be more advanced than the simple `<clock>` and a few starting examples include:

Standard UI Component (includeing [Angular Material](https://material.angular.io/components/categories), [React Bootstrap](https://react-bootstrap.github.io/components/navbar/), and many others)
- Table
- Navigation
- etc.

Data Visualizations (from [D3.js](https://d3js.org/) to other charting libraries):
- Bar Chart
- Network Graph
- etc.

Or, entire applications with nested Web Components. The Shadow DOM allows for this kind of (HTML/CSS/JS) encapsulation. As an example, `<my-complex-component>` could render an entire application with a `<clock>` and a number of components including `<bar-chart>`, `<network-graph>`, `<nav-bar>`, `<table>`, and others:

```
<my-complex-component config="uuid"></my-complex-component>
```

The response from the server would require a shared mapping of the purpose of the `uuid` as a pointer to data. In this case, the `uuid` notifies the server that of the query to run, so that server compute time does not re-run a database query (or set of queries).

**GET /data/{uuid}**
<br>
```
{
    "data": {
        // Server data
    },
    "timestamp": <float>, // Date format
    // Other server data
}
```