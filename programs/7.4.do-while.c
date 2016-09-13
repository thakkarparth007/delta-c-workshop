/*
	To demonstrate a do-while loop
 */

#include <stdio.h>
#include <math.h>

int main() {
	char wish_to_continue = 'N';
	int number;

	printf("**Outside the do-while loop**\n\n");

	do {
		printf("**At the top of the do-while loop!**\n");
		printf("Enter a number: ");
		scanf("%d", &number);

		printf("The entered number is square of %f\n", sqrt(number));
		printf("To stop exploring square roots, press 'N'. ")
		printf("Press any other key to continue.\n");
		scanf("%c", &wish_to_continue);
	} while(wish_to_continue != 'N');

	printf("Exited the loop. Exiting the program. Bye!\n");
	return 0;
}