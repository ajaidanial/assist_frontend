import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

// Custom defined routes for authentication
import { ProtectedLayoutRoute, PublicLayoutRoute } from './components'
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts'

import {
  Dashboard as DashboardView,
  // Main Views
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Tasks as TasksView,
  Reminders as RemindersView,
  Transactions as TransactionsView,
  // Individual Views
  TransactionItem as TransactionItemView,
  TaskItem as TaskItemView,
  ReminderItem as ReminderItemView
} from './views'

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <ProtectedLayoutRoute
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      {/* Main Views */}
      <ProtectedLayoutRoute
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <ProtectedLayoutRoute
        component={TasksView}
        exact
        layout={MainLayout}
        path="/tasks"
      />
      <ProtectedLayoutRoute
        component={RemindersView}
        exact
        layout={MainLayout}
        path="/reminders"
      />
      <ProtectedLayoutRoute
        component={TransactionsView}
        exact
        layout={MainLayout}
        path="/transactions"
      />
      {/* Individual Views */}
      <ProtectedLayoutRoute
        component={TransactionItemView}
        exact
        layout={MainLayout}
        path="/transactions/:id"
      />
      <ProtectedLayoutRoute
        component={TaskItemView}
        exact
        layout={MainLayout}
        path="/tasks/:id"
      />
      <ProtectedLayoutRoute
        component={ReminderItemView}
        exact
        layout={MainLayout}
        path="/reminders/:id"
      />
      {/* Auth Views */}
      <PublicLayoutRoute
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <PublicLayoutRoute
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      {/* Not Found View */}
      <Route
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default Routes

// TODO: Protected Routes
