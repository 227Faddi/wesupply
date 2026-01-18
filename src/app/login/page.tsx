import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold">Login / Sign up</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required className="border p-2 rounded" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required className="border p-2 rounded" />
      </div>
      <div className="flex gap-4">
        <button formAction={login} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Log in</button>
        <button formAction={signup} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Sign up</button>
      </div>
    </form>
  )
}
