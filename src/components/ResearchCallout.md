# ResearchCallout Component

A flexible component for highlighting research studies, findings, methods, and impacts across the website.

## Props

- `title` (required): The title of the research callout
- `description` (required): Description of the research
- `type` (optional): 'study' | 'finding' | 'method' | 'impact' (default: 'study')
- `status` (optional): 'published' | 'in-press' | 'under-review' | 'in-progress' (default: 'published')
- `color` (optional): 'blue' | 'green' | 'purple' | 'orange' | 'red' (default: 'blue')
- `icon` (optional): Custom emoji/icon (defaults to type-based icon)
- `links` (optional): Array of links with label, url, and type
- `featured` (optional): Boolean to make callout prominent with special styling

## Usage Examples

### Basic Study Callout
```astro
<ResearchCallout
  title="Memory and Attention Study"
  description="Investigating neural mechanisms of episodic memory formation during attention lapses."
  type="study"
  status="published"
  color="blue"
/>
```

### Featured Research with Links
```astro
<ResearchCallout
  title="Breakthrough Finding"
  description="Discovery of new neural pathways involved in memory consolidation."
  type="finding"
  status="published"
  color="green" 
  featured={true}
  links={[
    { label: "Paper", url: "https://doi.org/...", type: "paper" },
    { label: "Data", url: "https://osf.io/...", type: "data" },
    { label: "Code", url: "https://github.com/...", type: "code" }
  ]}
/>
```

### Method/Tool Callout
```astro
<ResearchCallout
  title="New Analysis Pipeline"
  description="Open-source toolkit for preprocessing pupillometry data."
  type="method"
  status="published"
  color="purple"
  icon="🔧"
  links={[
    { label: "Package", url: "https://github.com/...", type: "code" },
    { label: "Demo", url: "https://demo.com", type: "demo" }
  ]}
/>
```

## Link Types

- `paper`: Academic papers, preprints
- `data`: Datasets, data repositories  
- `code`: Code repositories, software packages
- `demo`: Live demos, interactive examples

## Color Schemes

Each color provides a complete theme including background gradients, borders, and accent colors:

- `blue`: Academic, studies, general research
- `green`: Success, published work, positive findings
- `purple`: Methods, tools, technical work
- `orange`: In-progress, under review
- `red`: Important, high-impact findings