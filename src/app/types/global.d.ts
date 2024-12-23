
declare module '*.scss' { // меняем формат с css на scss если пишем на scss
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}
// для импорта стилей-модулей в typescript