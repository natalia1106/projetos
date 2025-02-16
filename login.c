#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <time.h>

bool espchar(int valorascii){
	int i, charesp[] = {32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 45, 47, 63, 64, 94, 95, 123, 126};
	int numespecial = sizeof(charesp) / sizeof(charesp[0]);
	
	for (i=0;i<numespecial;i++){
		if(valorascii == charesp[i]){
			return true;
		}
	}
	return false;
}

bool numcaracter(int valorascii){
	int i, charnum[] = {48, 49, 50, 51, 52, 53, 54, 55, 56, 57};
	int numnum = sizeof(charnum) / sizeof(charnum[0]);
	
	for(i=0;i<numnum;i++){
		if(valorascii == charnum[i]){
			return true;
		}
	}
	return false;
}

bool tamanho(int tam){
	if(tam >= 15){
		return true;
	}
	return false;
}

bool maiuscchar(int valorascii){
	int i, charmaiusc[] = {65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90};
	int nummaiusc = sizeof(charmaiusc) / sizeof(charmaiusc[0]);
	
	for(i=0;i<nummaiusc;i++){
		if(valorascii == charmaiusc[i]){

			return true;
		}
	}
	return false;
}

bool minuscchar(int valorascii){
	int i, charminusc[] = {97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122};
	int numminusc = sizeof(charminusc) / sizeof(charminusc[0]);
	
	for(i=0;i<numminusc;i++){
		if(valorascii == charminusc[i]){
			return true;
		}
	}
	return false;
}

bool verificar(char senha[]){
	int i, tam = strlen(senha);
	bool temesp = false, temminusc = false, temmaiusc = false, temnum = false;
	
	if(!tamanho(tam)){
		printf("|Senha fraca! A senha deve ter mais de 15 caracteres. Tente novamente.\n");
		printf("----------------------------------------------------------------\n");
        return false;
	}
	
	for(i=0;i<tam;i++){
		if(numcaracter(senha[i])){
			temnum = true;
			break;
		}
	}
	if(!temnum){
		printf("|Senha fraca! A senha deve conter pelo menos um numero. Tente novamente.\n");
		printf("----------------------------------------------------------------\n");
		return false;
	}
	
	for(i=0;i<tam;i++){
        if(minuscchar(senha[i])) {
            temminusc = true;
            break;
        }
    }
    if(!temminusc){
        printf("|Senha fraca! A senha deve conter pelo menos uma letra minuscula. Tente novamente.\n");
        printf("----------------------------------------------------------------\n");
        return false;
    }
	
	for(i=0;i<tam;i++){
		if(maiuscchar(senha[i])){
			temmaiusc = true;
			break;
		}
	}
	if(!temmaiusc){
		printf("|Senha fraca! A senha deve conter pelo menos uma letra maiuscula. Tente novamente.\n");
		printf("----------------------------------------------------------------\n");
        return false;
	}
	
	for(i=0;i<tam;i++){
		if(espchar(senha[i])){
			temesp = true;
			break;
		}
	}
	if(!temesp){
		printf("|Senha fraca! A senha deve conter pelo menos um caractere especial. Tente novamente.\n");
		printf("----------------------------------------------------------------\n");
        return false;
	}
	return true;
}

void Salt(char *str, int tam){
	int i, j, charesp[] = {32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 45, 47, 63, 64, 94, 95, 123, 126};
	int numespecial = sizeof(charesp) / sizeof(charesp[0]);
	
	for(i=0;i<tam;i++){
		int ascii = 33+rand()%(126-33+1);
		int codigoesp = 0;
		for(j=0;j<numespecial;j++){
			if(ascii == charesp[j]){
				codigoesp = 1;
				break;
			}
		}
		
		if (codigoesp || (ascii >= 48 && ascii <= 57) || (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
			str[i] = (char)ascii;
		} else i--;
	}
	str[tam] = '\0';
}

void charpascii(char senha[], char senha1[]){
	int i;
	char asci[5];
	senha1[0] = '\0';
	
	for(i=0;i<strlen(senha); i++){
		int ascii = (senha[i] + 4);
		sprintf(asci, "%d", ascii);
		strcat(senha1, asci);
	}
}

void asciipchar(char senha1[], char senha[]){
	int i=0, j=0;
	char tmp[4];
	
	while(senha1[i] != '\0'){
		strncpy(tmp, &senha1[i],2);
		tmp[2] = '\0';
		int numasci = strtol(tmp,NULL,10);
		
		if(numasci<32||numasci>126){
			strncpy(tmp, &senha1[i], 3);
			tmp[3] = '\0';
			numasci = strtol(tmp,NULL,10);
			i += 3;
		}else i+=2;
	
		senha[j++] = (char)(numasci - 4);		
	}
	senha[j] = '\0';
}

int operacao(){
	printf("|Qual a operacao que voce gostaria de fazer hoje?\n|\n");
	int op;
	
	printf("|Inclusao de novos Usuarios(1) \n");
	printf("|Alteracao de Usuarios(2) \n");
	printf("|Exclusao de Usuarios(3) \n");
	printf("|Listagem de Usuarios(4) \n");
	printf("|Encerrar operacoes(0) \n");
	printf("----------------------------------------------------------------\n");

	printf("|\n|Insira a operacao que deseja realizar: ");
	scanf("%d", &op);
	printf("|\n----------------------------------------------------------------\n");
	
	return op;
}

void incluir(){
	char n_user[50], senha[50], senha_c[300], sal[6];
	int c;
	
	printf("----------------------------------------------------------------\n");
	printf("|Inicializando inclusao de usuarios...\n");
	printf("----------------------------------------------------------------\n|");
	printf("\n|Digite o usuario: ");
	while ((c = getchar()) != '\n' && c != EOF);
	fgets(n_user, sizeof(n_user), stdin);
	n_user[strcspn(n_user, "\n")] = '\0';
	printf("|\n----------------------------------------------------------------\n|");
	do{
        printf("\n|Digite a senha: ");
        fgets(senha, sizeof(senha), stdin);
        senha[strcspn(senha, "\n")] = '\0';
    }while(!verificar(senha));
    printf("|\n----------------------------------------------------------------\n");
    FILE *arquivouser;
    arquivouser = fopen("credusers.txt", "a+");
    
	Salt(sal, 5);
	strcat(senha, sal);
	charpascii(senha, senha_c);
	fprintf(arquivouser, "%s, %s\n", n_user, senha_c);
	fclose(arquivouser);

}

void alterar(){
    char matriz[10][2][250];
    int num, i = 0,j;
    
    printf("----------------------------------------------------------------\n");
	printf("|Inicializando alteracao de usuarios...\n");
	printf("----------------------------------------------------------------\n|");
    FILE *arquivousers;
    char linha[100], nome_n[50], senha_n[50];

    arquivousers = fopen("credusers.txt", "r");

    while (fgets(linha, sizeof(linha), arquivousers) && i < 10) {
        linha[strcspn(linha, "\n")] = '\0';

        char *nome = strtok(linha, ",");
        char *senha = strtok(NULL, ",");
        
        if (nome != NULL && senha != NULL) {
            strcpy(matriz[i][0], nome);
            strcpy(matriz[i][1], senha);
            i++;
        }
    }

    fclose(arquivousers);

    printf("Qual usuario deseja alterar?\n|usuario: ");
    scanf("%d", &num);

    if (num < 0 || num >= i) {
        printf("N?mero de usu?rio inv?lido.\n");
        return;
    }
    
	printf("----------------------------------------------------------------\n");
    printf("|Insira o nome do novo usuario %d \n|nome: ", num);
    scanf(" %[^\n]", nome_n);
    printf("----------------------------------------------------------------\n");
    do{
    	printf("|Insira a senha do novo usuario %d \n|senha: ", num);
    	fgets(senha_n, sizeof(senha_n), stdin);
    	senha_n[strcspn(senha_n, "\n")] = '\0';
    }while(!verificar(senha_n));
    printf("----------------------------------------------------------------\n");

    strcpy(matriz[num][0], nome_n);
    strcpy(matriz[num][1], senha_n);

    arquivousers = fopen("credusers.txt", "w");
    for (j = 0; j < i; j++) {
        fprintf(arquivousers, "%s, %s\n", matriz[j][0], matriz[j][1]);
    }

    fclose(arquivousers);

    printf("|Usuario alterado com sucesso!\n");
    printf("----------------------------------------------------------------\n|");
}

void excluir() {
    char matriz[10][2][250];
    int num, i = 0, j;
    FILE *arquivousers;
    char linha[300];

    arquivousers = fopen("credusers.txt", "r");

    while (fgets(linha, sizeof(linha), arquivousers) && i < 10) {
        linha[strcspn(linha, "\n")] = '\0';
        char *nome = strtok(linha, ", ");
        char *senha = strtok(NULL, "\n");

        if (nome != NULL && senha != NULL) {
            strncpy(matriz[i][0], nome, sizeof(matriz[i][0]) - 1);
            strncpy(matriz[i][1], senha, sizeof(matriz[i][1]) - 1);
            i++;
        }
    }

    fclose(arquivousers);
	printf("----------------------------------------------------------------\n");
    printf("|Qual usuario deseja excluir? (0 a %d):\n|usuario: ", i - 1);
    scanf("%d", &num);
    printf("----------------------------------------------------------------\n");

    if (num < 0 || num >= i) {
        printf("|Numero de usuario invalido.\n");
        printf("----------------------------------------------------------------\n");
        return;
    }

    arquivousers = fopen("credusers.txt", "w");

    for (j = 0; j < i; j++) {
        if (j != num) {
            fprintf(arquivousers, "%s, %s\n", matriz[j][0], matriz[j][1]);
        }
    }

    fclose(arquivousers);
	
    printf("|Usuario excluido com sucesso!\n");
    printf("----------------------------------------------------------------\n");
}

void listar() {
    FILE *arquivouser;
    char linha[300];
    arquivouser = fopen("credusers.txt", "r");
    int i = 0;
	
	printf("----------------------------------------------------------------\n");
	printf("|Lista de usuarios atuais:\n");
	printf("----------------------------------------------------------------\n");
	
    while (fgets(linha, sizeof(linha), arquivouser) != NULL) {
        linha[strcspn(linha, "\n")] = '\0';  

        char *nome = strtok(linha, ",");  
        if (nome != NULL) {
            printf("|%d. %s\n", i, nome);  
            i++;
        }
    }
	
	printf("----------------------------------------------------------------\n");
    fclose(arquivouser);
}

int main(){
	srand(time(NULL));
	char u_adm[50], s_adm[50], s_adm1[50], sal[50], s_crip[250], user[50], senha[50];
	
	
	FILE *arquivoadm;
	arquivoadm = fopen("credadm.txt", "r");
	
	if(arquivoadm != NULL){
		fscanf(arquivoadm, "%[^,], %[^\n]", u_adm, s_crip);
		fclose(arquivoadm);
	}else{
		fclose(arquivoadm);
		printf("----------------------------------------------------------------\n");
		printf("|Criando banco para credenciais de administrador...\n");
		printf("----------------------------------------------------------------\n\n");
		arquivoadm = fopen("credadm.txt", "w");
		printf("----------------------------------------------------------------\n");
		printf("|Nome do usu?rio: ");
		fgets(u_adm, sizeof(u_adm), stdin);
		u_adm[strcspn(u_adm, "\n")] = '\0';
		printf("----------------------------------------------------------------\n");
		do {
        	printf("|Senha do admin: ");
        	fgets(s_adm, sizeof(s_adm), stdin);
        	s_adm[strcspn(s_adm, "\n")] = '\0';
    	} while (!verificar(s_adm));
		printf("----------------------------------------------------------------\n");
		
		Salt(sal, 5);
		strcat(s_adm, sal);
		charpascii(s_adm, s_crip);
		
		fprintf(arquivoadm, "%s, %s", u_adm, s_crip);
		printf("%s\n", s_crip);
		printf("%s\n", s_adm);
		fclose(arquivoadm);
		}
	printf("----------------------------------------------------------------\n");
	printf("Iniciando processo de login ao banco de senhas...\n");
	printf("----------------------------------------------------------------\n");
	asciipchar(s_crip, s_adm);
	printf("|Digite seu usuario: ");
    fgets(user, sizeof(user), stdin);
    user[strcspn(user, "\n")] = '\0';
	printf("----------------------------------------------------------------\n");
	printf("|Digite sua senha: ");
    fgets(senha, sizeof(senha), stdin);
    senha[strcspn(senha, "\n")] = '\0';
	printf("----------------------------------------------------------------\n|\n");
	if(strcmp(u_adm, user) == 0 && strncmp(s_adm, senha, strlen(s_adm) - 5) == 0){
		printf("|Bem vindo ao seu banco de senhas!\n|\n");
	}else{
		printf("Usuario nao encontrado ou senha incorreta.\n\n");
		printf("----------------------------------------------------------------\n\n");
		return 0;
	}
	printf("----------------------------------------------------------------\n|\n");
	
	
	int op;
	
	do{
		
	op = operacao();	
	
	switch(op){
			
		case 1:
			printf("|Voce selecionou a opcao INCLUSAO DE USUARIOS\n");
			incluir();
			break;
	
		case 2:
			printf("|Voce selecionou a opcao ALTERACAO DE USUARIOS\n");
			alterar();
			break;
	
		case 3:
			printf("|Voce selecionou a opcao EXCLUSAO DE USUARIOS\n");
            excluir();
			break;
	
		case 4:
			printf("|Voce selecionou a opcao LISTAGEM DE USUARIOS\n");
			listar();
			break;

		case 0:
			printf("|Desligando operacoes...\n");
			printf("----------------------------------------------------------------\n");
			return 0;
			break;
			
		default:
			printf("|Operacao invalida, tente novamente\n");
			op = operacao();
			break;
	}
}while(op != 0);

	return 0;
}
