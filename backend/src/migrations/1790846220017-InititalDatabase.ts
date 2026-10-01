import { MigrationInterface, QueryRunner } from "typeorm";

export class InititalDatabase1790846220017 implements MigrationInterface {
    name = 'InititalDatabase1790846220017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shelf_books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('WANT_TO_READ', 'READING', 'COMPLETED') NOT NULL DEFAULT 'WANT_TO_READ', \`current_page\` int NOT NULL DEFAULT '0', \`rating\` tinyint NULL, \`note\` text NULL, \`started_at\` datetime NULL, \`finished_at\` datetime NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`book_id\` int NULL, UNIQUE INDEX \`REL_3234db9f227c8a328603d059f9\` (\`book_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`work_id\` varchar(255) NOT NULL, \`title\` varchar(500) NOT NULL, \`authors\` json NULL, \`cover_id\` bigint NULL, \`cover_url\` varchar(500) NULL, \`description\` text NULL, \`subjects\` json NULL, \`first_publish_date\` varchar(100) NULL, \`number_of_pages\` int NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_663b9dd8b5bbcaad1cabda855b\` (\`work_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`shelf_books\` ADD CONSTRAINT \`FK_3234db9f227c8a328603d059f94\` FOREIGN KEY (\`book_id\`) REFERENCES \`books\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shelf_books\` DROP FOREIGN KEY \`FK_3234db9f227c8a328603d059f94\``);
        await queryRunner.query(`DROP INDEX \`IDX_663b9dd8b5bbcaad1cabda855b\` ON \`books\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP INDEX \`REL_3234db9f227c8a328603d059f9\` ON \`shelf_books\``);
        await queryRunner.query(`DROP TABLE \`shelf_books\``);
    }

}
