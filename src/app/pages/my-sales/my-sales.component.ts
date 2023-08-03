import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
const ELEMENT_DATA: any[] = [
  {
    id: 123,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: 'Kulas Light Apt. 556 Gwenborough',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: 'Romaguera-Crona',
    expanded: false,
  },
  {
    id: 52,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: 'Victor Plains Suite 879 Wisokyburgh',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: 'Deckow-Crist',
    expanded: false,
  },
  {
    id: 62,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    address: 'Douglas Extension Suite 847 McKenziehaven',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: 'Romaguera-Jacobson',
    expanded: false,
  },
  {
    id: 65,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    address: 'Hoeger Mall Apt. 692 South Elvis',
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: 'Robel-Corkery',
    expanded: false,
  },
  {
    id: 84,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    address: 'Skiles Walks Suite 351 Roscoeview',
    phone: '(254)954-1289',
    website: 'demarco.info',
    company: 'Keebler LLC',
    expanded: false,
  },
  {
    id: 123,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: 'Kulas Light Apt. 556 Gwenborough',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: 'Romaguera-Crona',
    expanded: false,
  },
  {
    id: 52,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: 'Victor Plains Suite 879 Wisokyburgh',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: 'Deckow-Crist',
    expanded: false,
  },
  {
    id: 62,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    address: 'Douglas Extension Suite 847 McKenziehaven',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: 'Romaguera-Jacobson',
    expanded: false,
  },
  {
    id: 65,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    address: 'Hoeger Mall Apt. 692 South Elvis',
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: 'Robel-Corkery',
    expanded: false,
  },
  {
    id: 84,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    address: 'Skiles Walks Suite 351 Roscoeview',
    phone: '(254)954-1289',
    website: 'demarco.info',
    company: 'Keebler LLC',
    expanded: false,
  },
  {
    id: 62,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    address: 'Douglas Extension Suite 847 McKenziehaven',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: 'Romaguera-Jacobson',
    expanded: false,
  },
];

@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.component.html',
  styleUrls: ['./my-sales.component.scss'],
})
export class MySalesComponent implements OnInit {
  columnsToDisplay = ['id', 'name', 'username', 'email', 'address', 'action'];
  dataSource = ELEMENT_DATA;

  scrollDistance = 2;
  upScrollDistance = 1.5;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  visible:boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public onEdit(elem: any) {
    console.log(elem);
  }

  public onDelete(elem: any) {
    console.log(elem);
  }
  public loadMoreData() {
    this.visible = false;
    setTimeout(() => {
      const nextPageData = [...this.dataSource];
      this.dataSource = this.dataSource.concat(nextPageData);
    }, 2000);
  }
}
