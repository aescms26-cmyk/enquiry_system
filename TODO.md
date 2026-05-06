# Admin Dashboard Separation TODO

## Task
Separate AdminDashboard.tsx into individual components.

## Components to Create
- [ ] 1. Create src/components/admin-dashboard/ folder
- [x] 2. DashboardOverview.tsx - Stats cards, Quick Portals, Enquiry trends chart
- [ ] 3. UserManagement.tsx - User table, user form modal, Clear data modal
- [ ] 4. CourseCatalog.tsx - Course table, course form modal
- [ ] 5. EnquiryManagement.tsx - Enquiries table, processing modal
- [ ] 6. TransportManagement.tsx - Routes, Stops, forms, roster modal
- [ ] 7. SystemReports.tsx - Analytics charts and metrics

## Update
- [ ] 8. Update AdminDashboard.tsx to import all components

## Status: In Progress

## Plan
1. Create UserManagement.tsx - Extract users tab content including user table, form modal, clear data modal
2. Create CourseCatalog.tsx - Extract courses tab content
3. Create EnquiryManagement.tsx - Extract enquiries tab content
4. Create TransportManagement.tsx - Extract transport tab content
5. Create SystemReports.tsx - Extract reports tab content
6. Update AdminDashboard.tsx to import and render all components
