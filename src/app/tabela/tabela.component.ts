import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FilmeService } from '../filme.service';

export interface IFilme {
  id: BigInt;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface IFilmeTrendingResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: IFilme[];
}

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss'
})
export class TabelaComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'release_date'];
  dataSource: MatTableDataSource<IFilme> = new MatTableDataSource<IFilme>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private filmeService: FilmeService) {
  }

  ngAfterViewInit(): void {
    this.filmeService.listarFilmesTrending().subscribe(
      {
        next: (res) => {
          this.dataSource = new MatTableDataSource(res.results);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
        },
        complete: () => {
          console.log("Completou");
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}