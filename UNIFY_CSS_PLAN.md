# CSS Unification Plan for Team Lead, Counsellor, and Admin Dashboards

## Summary of Current State

### 1. Team Lead Dashboard
- **Accent Color**: Blue (#1976D2)
- **Main CSS**: `src/styles/pages/TeamLeadDashboard.css` + `src/components/team-lead-dashboard/*.css`
- **Pattern**: Glass morphism with sidebar navigation, rounded-xl buttons, shadow-lg effects

### 2. Counsellor Dashboard
- **Accent Color**: Blue (#3b82f6 / #2563eb)
- **Main CSS**: `src/styles/pages/CounsellorDashboard.css` + `src/styles/components/counsellor-dashboard/index.css`
- **Pattern**: Uses `cd-` prefixed classes, two-column layout (queue + workspace)

### 3. Admin Dashboard
- **Accent Color**: Red (#D32F2F)
- **Main CSS**: `src/styles/pages/AdminDashboard.css` (minimal) + inline styles
- **Pattern**: Similar sidebar nav buttons, content cards with shadows

## Key Differences to Unify

### Sidebar Buttons
| Component | Active Class | Inactive Light | Inactive Dark |
|----------|-----------|--------------|--------------|-------------|
| Team Lead | bg-[#1976D2] text-white | bg-white text-slate-600 border-slate-200 | bg-white/5 text-slate-400 |
| Counsellor | bg-blue-600 text-white | bg-white text-gray-700 border-gray-200 | bg-white/5 text-slate-400 |
| Admin | bg-[#D32F2F] text-white | bg-white text-slate-600 border-slate-200 | bg-white/5 text-slate-400 |

### Content Cards
All three use similar card patterns:
- Border radius: 1.5rem - 2rem (rounded-2xl)
- Padding: 2rem - 3rem
- Shadow: shadow-xl or similar
- Border: 1px solid with opacity

### Stats Cards
| Component | Grid | Card Style |
|----------|------|----------|
| Team Lead | grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 | glass-bg with blur |
| Counsellor | grid-cols-2 + md:grid-cols-4 | solid bg with shadow |
| Admin | Similar to Counsellor | solid bg with shadow |

## Unified CSS Approach

### Primary Colors (keep role-specific accent)
- Admin: #D32F2F (Red) - maintains authority feel
- Team Lead: #1976D2 (Blue) - maintains team management feel  
- Counsellor: #3b82f6 (Blue) - maintains activity feel

### Shared CSS Variables
Create unified design tokens:
```css
:root {
  /* Radii */
  --radius-sm: 0.75rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2rem;
  
  /* Spacings */
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
}
```

## Implementation Steps

### Step 1: Update Team Lead Dashboard CSS
- Keep sidebar styling similar to Admin
- Ensure content card uses consistent padding (p-8)
- Update stats grid to match Counsellor pattern

### Step 2: Update Counsellor Dashboard CSS  
- Slight adjustment to button radius (rounded-xl already matches)
- Ensure sidebar buttons match Admin pattern
- Keep `cd-` class prefix (this is fine, just unify the base styles)

### Step 3: Update Admin Dashboard CSS
- Match button styles with Team Lead pattern
- Add proper content card wrapper styling
- Ensure consistent spacing

### Step 4: Final Polish
- Test responsive layouts
- Verify dark mode compatibility
- Check hover states consistency

## Files to Edit

1. `src/styles/pages/TeamLeadDashboard.css` - Unify spacing and card styles
2. `src/styles/pages/CounsellorDashboard.css` - Verify consistency
3. `src/styles/pages/AdminDashboard.css` - Expand with missing styles
4. `src/components/admin-dashboard/AdminSidebar.css` - Add missing styles
5. `src/styles/components/counsellor-dashboard/index.css` - Verify (already well-structured)

## No Logic Changes Required
All CSS changes are visual-only - no React component logic or data handling will be modified.
