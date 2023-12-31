﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Shop_BG_Challenge.DataContext;

#nullable disable

namespace Shop_BG_Challenge.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20231123221216_SecondMigration")]
    partial class SecondMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Shop_BG_Challenge.Models.Pricing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Pricings");
                });

            modelBuilder.Entity("Shop_BG_Challenge.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.Property<int?>("PricingId")
                        .HasColumnType("integer");

                    b.Property<bool>("Status")
                        .HasColumnType("boolean");

                    b.Property<int>("Stock")
                        .HasColumnType("integer");

                    b.Property<string>("UrlImage")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("PricingId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Shop_BG_Challenge.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PricingId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Shop_BG_Challenge.Models.Product", b =>
                {
                    b.HasOne("Shop_BG_Challenge.Models.Pricing", null)
                        .WithMany("Products")
                        .HasForeignKey("PricingId");
                });

            modelBuilder.Entity("Shop_BG_Challenge.Models.Pricing", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
