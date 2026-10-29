// Ícones originais do pacote (materiais/originais/vetores), inline para herdar currentColor.
const paths = {
  'arrow-right': <path d="M4 12h16m-6-6 6 6-6 6" />,
  'arrow-up-right': <path d="M6 18 18 6M6 6h12v12" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 8h16M4 16h16" />,
  message: <path d="M20 11a8 8 0 0 1-8 8H5l-3 3v-10a9 9 0 0 1 18-1Z" />,
  plus: <path d="M4 12h16M12 4v16" />,
  location: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
}

export type IconName = keyof typeof paths

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}
