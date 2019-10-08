import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { RouteWithLayout } from './components'
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
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      {/* Main Views */}
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={TasksView}
        exact
        layout={MainLayout}
        path="/tasks"
      />
      <RouteWithLayout
        component={RemindersView}
        exact
        layout={MainLayout}
        path="/reminders"
      />
      <RouteWithLayout
        component={TransactionsView}
        exact
        layout={MainLayout}
        path="/transactions"
      />
      {/* Individual Views */}
      <RouteWithLayout
        component={TransactionItemView}
        exact
        layout={MainLayout}
        path="/transactions/:id"
      />
      <RouteWithLayout
        component={TaskItemView}
        exact
        layout={MainLayout}
        path="/tasks/:id"
      />
      <RouteWithLayout
        component={ReminderItemView}
        exact
        layout={MainLayout}
        path="/reminders/:id"
      />
      {/* Auth Views */}
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      {/* Not Found View */}
      <RouteWithLayout
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
