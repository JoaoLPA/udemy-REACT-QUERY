export function Species({ name, language, average_lifespan }) {
  return (
    <li>
      {name}
      <ul>
        <li>language: {language}</li>
        <li>average lifespan: {average_lifespan}</li>
      </ul>
    </li>
  );
}
