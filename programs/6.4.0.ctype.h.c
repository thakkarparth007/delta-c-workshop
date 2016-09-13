/*
	Program to show the usage of the ctype functions
 */

#include <stdio.h>
#include <ctype.h>

int main() {
	char ch = 'a';

	printf("isupper('%c') = %d \n", ch, isupper(c));
	printf("islower('%c') = %d \n", ch, islower(c));
	printf("toupper('%c') = %d \n", ch, toupper(c));
	printf("tolower(toupper('%c')) = %d \n", ch, tolower(toupper(c)));
	printf("isspace('%c') = %d \n", ' ', isspace(c));
	printf("isalpha('%c') = %d \n", '*', isalpha(c));

	printf("toupper('%c') = %c", 'a', (char)toupper('a') );

	return 0;
}