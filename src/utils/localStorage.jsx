const employees = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Design Landing Page",
        taskDescription: "Create responsive landing page for the website.",
        taskDate: "2026-06-12",
        category: "Design"
      },
      {
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Fix Login Bug",
        taskDescription: "Resolve authentication issue on login page.",
        taskDate: "2026-06-10",
        category: "Development"
      },
      {
        active: false,
        completed: false,
        failed: true,
        taskTitle: "Database Backup",
        taskDescription: "Perform scheduled database backup.",
        taskDate: "2026-06-08",
        category: "Database"
      }
    ]
  },

  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Create Dashboard UI",
        taskDescription: "Build employee dashboard interface.",
        taskDate: "2026-06-15",
        category: "UI/UX"
      },
      {
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Write API Docs",
        taskDescription: "Document employee APIs.",
        taskDate: "2026-06-14",
        category: "Documentation"
      },
      {
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Code Review",
        taskDescription: "Review pull requests from team.",
        taskDate: "2026-06-09",
        category: "Development"
      },
      {
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Deploy Build",
        taskDescription: "Deploy latest build to staging server.",
        taskDate: "2026-06-07",
        category: "DevOps"
      }
    ]
  },

  {
    id: 3,
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Testing Payment Gateway",
        taskDescription: "Run payment integration tests.",
        taskDate: "2026-06-18",
        category: "Testing"
      },
      {
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Optimize Images",
        taskDescription: "Compress and optimize website images.",
        taskDate: "2026-06-11",
        category: "Performance"
      },
      {
        active: false,
        completed: false,
        failed: true,
        taskTitle: "Security Audit",
        taskDescription: "Check for vulnerabilities in application.",
        taskDate: "2026-06-05",
        category: "Security"
      },
      {
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Prepare Sprint Report",
        taskDescription: "Create sprint progress report.",
        taskDate: "2026-06-19",
        category: "Management"
      },
      {
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Update Dependencies",
        taskDescription: "Upgrade outdated packages.",
        taskDate: "2026-06-13",
        category: "Maintenance"
      }
    ]
  },

  {
    id: 4,
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Build Profile Page",
        taskDescription: "Develop employee profile module.",
        taskDate: "2026-06-20",
        category: "Development"
      },
      {
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Create Wireframes",
        taskDescription: "Prepare wireframes for mobile screens.",
        taskDate: "2026-06-10",
        category: "Design"
      },
      {
        active: true,
        completed: false,
        failed: false,
        taskTitle: "User Feedback Analysis",
        taskDescription: "Analyze customer feedback reports.",
        taskDate: "2026-06-21",
        category: "Research"
      },
      {
        active: false,
        completed: false,
        failed: true,
        taskTitle: "Server Monitoring",
        taskDescription: "Monitor server performance metrics.",
        taskDate: "2026-06-09",
        category: "DevOps"
      }
    ]
  },

  {
    id: 5,
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Create Blog Section",
        taskDescription: "Implement company blog page.",
        taskDate: "2026-06-25",
        category: "Development"
      },
      {
        active: false,
        completed: true,
        failed: false,
        taskTitle: "SEO Optimization",
        taskDescription: "Improve SEO score of website.",
        taskDate: "2026-06-12",
        category: "Marketing"
      },
      {
        active: false,
        completed: true,
        failed: false,
        taskTitle: "Update FAQs",
        taskDescription: "Refresh FAQ section content.",
        taskDate: "2026-06-11",
        category: "Content"
      },
      {
        active: true,
        completed: false,
        failed: false,
        taskTitle: "Customer Survey",
        taskDescription: "Collect customer satisfaction data.",
        taskDate: "2026-06-22",
        category: "Research"
      },
      {
        active: false,
        completed: false,
        failed: true,
        taskTitle: "Email Campaign",
        taskDescription: "Launch monthly email campaign.",
        taskDate: "2026-06-06",
        category: "Marketing"
      }
    ]
  }
];

const admin = {
  id: 1,
  email: "admin@example.com",
  password: "123"
};

export const setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('admin', JSON.stringify(admin))
}

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const admin = JSON.parse(localStorage.getItem('admin'));

    return {employees, admin}

}