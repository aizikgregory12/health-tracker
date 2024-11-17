declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "./Header" {
  const Header: React.FC<any>;
  export default Header;
}

declare module "./ExerciseLog" {
  const ExerciseLog: React.FC<any>;
}

declare module "./MealLog" {
  const MealLog: React.FC<any>;
  export default MealLog;
}
