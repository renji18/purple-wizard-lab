export interface componentsObjTemplate {
  id: string
  name: string
  type: string
  category: string
  os?: string
  template?: string
  icon: any
  validSources?: Array<string>
  requirements?: Array<string>
  inputs?: Array<{
    key: string
    label: string
    type: string
    required?: boolean
    default?: number | string
    options?: any
  }>
}

const componentsObj: Array<componentsObjTemplate> = [
  {
    id: "win-server-2019",
    name: "Windows Server 2019",
    type: "server",
    category: "Operating Systems",
    os: "windows",
    template: "win2019-template",
    icon: "🖥",
    inputs: [
      {
        key: "computerName",
        label: "Computer Name",
        type: "text",
        required: true,
      },
      { key: "ipAddress", label: "IP Address", type: "text", required: true },
      { key: "cores", label: "CPU Cores", type: "number", default: 2 },
      { key: "memory", label: "Memory (GB)", type: "number", default: 4 },
      {
        key: "diskSize",
        label: "Disk Size (GB)",
        type: "number",
        default: 100,
      },
      {
        key: "adminPassword",
        label: "Administrator Password",
        type: "password",
        required: true,
      },
    ],
  },
  {
    id: "win-server-2016",
    name: "Windows Server 2016",
    type: "server",
    category: "Operating Systems",
    os: "windows",
    template: "win2016-template",
    icon: "🖥",
    inputs: [
      {
        key: "computerName",
        label: "Computer Name",
        type: "text",
        required: true,
      },
      { key: "ipAddress", label: "IP Address", type: "text", required: true },
      { key: "cores", label: "CPU Cores", type: "number", default: 2 },
      { key: "memory", label: "Memory (GB)", type: "number", default: 4 },
      {
        key: "diskSize",
        label: "Disk Size (GB)",
        type: "number",
        default: 100,
      },
      {
        key: "adminPassword",
        label: "Administrator Password",
        type: "password",
        required: true,
      },
    ],
  },
  {
    id: "win-10",
    name: "Windows 10",
    type: "workstation",
    category: "Operating Systems",
    os: "windows",
    template: "win10-template",
    icon: "💻",
    inputs: [
      {
        key: "computerName",
        label: "Computer Name",
        type: "text",
        required: true,
      },
      { key: "ipAddress", label: "IP Address", type: "text", required: true },
      { key: "cores", label: "CPU Cores", type: "number", default: 2 },
      { key: "memory", label: "Memory (GB)", type: "number", default: 4 },
      { key: "diskSize", label: "Disk Size (GB)", type: "number", default: 50 },
      {
        key: "adminPassword",
        label: "Administrator Password",
        type: "password",
        required: true,
      },
    ],
  },
  {
    id: "ubuntu-22-04",
    name: "Ubuntu 22.04",
    type: "workstation",
    category: "Operating Systems",
    os: "linux",
    template: "ubuntu2204-template",
    icon: "🐧",
    inputs: [
      { key: "hostname", label: "Hostname", type: "text", required: true },
      { key: "ipAddress", label: "IP Address", type: "text", required: true },
      { key: "cores", label: "CPU Cores", type: "number", default: 2 },
      { key: "memory", label: "Memory (GB)", type: "number", default: 4 },
      { key: "diskSize", label: "Disk Size (GB)", type: "number", default: 50 },
      { key: "username", label: "Username", type: "text", required: true },
      { key: "password", label: "Password", type: "password", required: true },
    ],
  },
  {
    id: "install-ad",
    name: "Install Active Directory",
    type: "service",
    category: "Configurations",
    icon: "📁",
    validSources: ["win-server-2019", "win-server-2016"],
    inputs: [
      {
        key: "domainName",
        label: "Domain Name",
        type: "text",
        required: true,
        default: "lab.local",
      },
      {
        key: "dsrmPassword",
        label: "DSRM Password",
        type: "password",
        required: true,
      },
      {
        key: "forestLevel",
        label: "Forest Level",
        type: "select",
        default: "2016",
        options: ["2016", "2019"],
      },
    ],
  },
  {
    id: "join-domain",
    name: "Join Domain",
    type: "action",
    category: "Configurations",
    icon: "🔗",
    validSources: ["win-10"],
    inputs: [
      { key: "domainName", label: "Domain Name", type: "text", required: true },
      {
        key: "domainAdmin",
        label: "Domain Admin",
        type: "text",
        required: true,
      },
      {
        key: "domainPassword",
        label: "Domain Password",
        type: "password",
        required: true,
      },
    ],
  },
  {
    id: "install-splunk",
    name: "Install Splunk",
    type: "service",
    category: "Configurations",
    icon: "📊",
    validSources: ["win-server-2019", "win-server-2016", "ubuntu-server"],
    inputs: [],
  },
  {
    id: "install-sql",
    name: "Install SQL Server",
    type: "service",
    category: "Configurations",
    icon: "💾",
    validSources: ["win-server-2019", "win-server-2016"],
    inputs: [],
  },
  {
    id: "install-iis",
    name: "Install IIS",
    type: "service",
    category: "Configurations",
    icon: "🌐",
    validSources: ["win-server-2019", "win-server-2016", "win-10"],
  },
  {
    id: "install-apache",
    name: "Install Apache",
    type: "service",
    category: "Configurations",
    icon: "🌍",
    validSources: ["ubuntu-server", "ubuntu-22-04"],
    inputs: [],
  },
  {
    id: "asreproasting",
    name: "ASREPRoasting",
    type: "security",
    category: "Configurations",
    icon: "🎣",
    validSources: ["kali-linux"],
    requirements: ["install-ad"],
  },
  {
    id: "vulnerable-jenkins",
    name: "Vulnerable Jenkins Server",
    type: "security",
    category: "Configurations",
    icon: "",
    validSources: ["ubuntu-server"],
    inputs: [],
  },
  {
    id: "log4j",
    name: "Log4j",
    type: "security",
    category: "Configurations",
    icon: "⚠",
    validSources: ["ubuntu-server", "ubuntu-22-04"],
    requirements: ["install-apache"],
  },
]

export default componentsObj
