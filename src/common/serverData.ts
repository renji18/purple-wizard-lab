const serverData: Array<{
  name: string
  components: Array<{
    name: string
    content: Array<{ name: string; shape: string; dependsOn?: string }>
  }>
}> = [
  {
    name: "AWS",
    components: [
      {
        name: "Operating System",
        content: [
          { name: "Windows Server 2019", shape: "rectangle" },
          { name: "Windows Server 2016", shape: "rectangle" },
          { name: "Windows 10", shape: "rectangle" },
          { name: "Windows 7", shape: "rectangle" },
          { name: "Ubuntu 22.04", shape: "rectangle" },
          { name: "Kali Linux", shape: "rectangle" },
        ],
      },
      {
        name: "Configurations",
        content: [
          { name: "Install Active Directory", shape: "ellipse" },
          {
            name: "Join Domain",
            shape: "ellipse",
            dependsOn: "Install Active Directory",
          },
          { name: "Install Splunk", shape: "ellipse" },
          {
            name: "Install Splunk Forwarder",
            shape: "ellipse",
            dependsOn: "Install Splunk Server",
          },
          { name: "Install Sysmon", shape: "ellipse" },
          { name: "Enable CommandLine Logging", shape: "ellipse" },
          { name: "Enable Powershell Logging", shape: "ellipse" },
          {
            name: "ASREPRoasting",
            shape: "ellipse",
            dependsOn: "Install Active Directory",
          },
          { name: "Vulnerable Jenkins Server", shape: "ellipse" },
        ],
      },
    ],
  },
  {
    name: "Proxmox",
    components: [
      {
        name: "Operating System",
        content: [
          { name: "Windows 2019", shape: "rectangle" },
          { name: "Windows 2016", shape: "rectangle" },
          { name: "Windows 10", shape: "rectangle" },
          { name: "Windows 7", shape: "rectangle" },
          { name: "Ubuntu 22.04", shape: "rectangle" },
          { name: "Ubuntu Server 22.04", shape: "rectangle" },
          { name: "Kali Linux", shape: "rectangle" },
        ],
      },
      {
        name: "Configurations",
        content: [
          { name: "Install Active Directory", shape: "ellipse" },
          {
            name: "Join Domain",
            shape: "ellipse",
            dependsOn: "Install Active Directory",
          },
          { name: "Install Splunk Server", shape: "ellipse" },
          {
            name: "Install Splunk Forwarder",
            shape: "ellipse",
            dependsOn: "Install Splunk Server",
          },
          { name: "Install Sysmon", shape: "ellipse" },
          { name: "Enable CommandLine Logging", shape: "ellipse" },
          { name: "Enable Powershell Logging", shape: "ellipse" },
          {
            name: "ASREPRoasting Vulnerability",
            shape: "ellipse",
            dependsOn: "Install Active Directory",
          },
          { name: "Vulnerable Share", shape: "ellipse" },
        ],
      },
    ],
  },
  {
    name: "VMware",
    components: [
      {
        name: "Operating System",
        content: [
          { name: "Windows 2019", shape: "rectangle" },
          { name: "Windows 2016", shape: "rectangle" },
          { name: "Windows 10", shape: "rectangle" },
          { name: "Windows 7", shape: "rectangle" },
          { name: "Ubuntu 22.04", shape: "rectangle" },
          { name: "Ubuntu Server 22.04", shape: "rectangle" },
          { name: "Kali Linux", shape: "rectangle" },
        ],
      },
      {
        name: "Configurations",
        content: [
          { name: "Install Active Directory", shape: "ellipse" },
          {
            name: "Join Domain",
            shape: "ellipse",
            dependsOn: "Install Active Directory",
          },
          { name: "Install Splunk Server", shape: "ellipse" },
          {
            name: "Install Splunk Forwarder",
            shape: "ellipse",
            dependsOn: "Install Splunk Server",
          },
          { name: "Install Sysmon", shape: "ellipse" },
          { name: "Enable CommandLine Logging", shape: "ellipse" },
          { name: "Enable Powershell Logging", shape: "ellipse" },
          {
            name: "ASREPRoasting Vulnerability",
            shape: "ellipse",
            dependsOn: "Install Active Directory",
          },
          { name: "Vulnerable Share", shape: "ellipse" },
        ],
      },
    ],
  },
  {
    name: "VirtualBox",
    components: [
      {
        name: "Operating System",
        content: [
          { name: "Windows 2019", shape: "rectangle" },
          { name: "Windows 2016", shape: "rectangle" },
          { name: "Windows 10", shape: "rectangle" },
          { name: "Windows 7", shape: "rectangle" },
          { name: "Ubuntu 22.04", shape: "rectangle" },
          { name: "Ubuntu Server 22.04", shape: "rectangle" },
          { name: "Kali Linux", shape: "rectangle" },
        ],
      },
      {
        name: "Configurations",
        content: [
          { name: "Install Active Directory", shape: "ellipse" },
          {
            name: "Join Domain",
            shape: "ellipse",
            dependsOn: "Install Active Directory",
          },
          { name: "Install Splunk Server", shape: "ellipse" },
          {
            name: "Install Splunk Forwarder",
            shape: "ellipse",
            dependsOn: "Install Splunk Server",
          },
          { name: "Install Sysmon", shape: "ellipse" },
          { name: "Enable CommandLine Logging", shape: "ellipse" },
          { name: "Enable Powershell Logging", shape: "ellipse" },
          {
            name: "ASREPRoasting Vulnerability",
            shape: "ellipse",
            dependsOn: "Install Active Directory",
          },
          { name: "Vulnerable Share", shape: "ellipse" },
        ],
      },
    ],
  },
]

export default serverData
